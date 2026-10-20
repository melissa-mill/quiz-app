import { useReducer } from "react";
import { getQuestions } from "./services/api";
import Header from "./components/Header";
import Question from "./components/Question";
import StartScreen from "./components/StartScreen";
import NextButton from "./components/NextButton";
import Timer from "./components/Timer";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import "./App.css";

const initialState = {
  questions: [],
  status: "initial",
  selectedCategory: null,
  index: 0,
  answer: null,
  score: 0,
  timeRemaining: null,
};

const SECS_PER_QUESTION = 30;
const NUM_QUESTIONS = 10;

const shuffle = (items) => {
  const shuffled = [...items];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        status: "loading",
        selectedCategory: action.payload,
      };
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        timeRemaining: NUM_QUESTIONS * SECS_PER_QUESTION,
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "newAnswer":
      return {
        ...state,
        index: state.index,
        answer: action.payload,
        score:
          state.questions[state.index].correct_answer === action.payload
            ? state.score + 1
            : state.score,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
      };
    case "restart":
      return {
        ...initialState,
      };
    case "tick":
      return {
        ...state,
        timeRemaining: state.timeRemaining - 1,
        status: state.timeRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action unknown");
  }
};

function App() {
  const [
    {
      questions,
      status,
      selectedCategory,
      index,
      answer,
      score,
      timeRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = NUM_QUESTIONS;

  const handleStart = async (category) => {
    try {
      dispatch({ type: "loading", payload: category });

      const data = await getQuestions(category);

      if (!data) {
        throw new Error("fetch request failed");
      }

      if (data.response_code === 0 && data.results.length > 0) {
        const questionsWithShuffledAnswers = data.results.map((question) => ({
          ...question,
          shuffledAnswers: shuffle([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        }));

        dispatch({
          type: "dataReceived",
          payload: questionsWithShuffledAnswers,
        });
      } else {
        throw new Error(data.response_code);
      }
    } catch (e) {
      console.log(e);
      dispatch({ type: "dataFailed" });
    }
  };

  return (
    <>
      <Header />
      {status === "loading" && (
        <div className="loading">
          <span className="loader">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </span>
          Loading
        </div>
      )}
      {status === "error" && (
        <div className="error">
          <span className="error_icon">⚠️</span> Error fetching questions
          <button
            onClick={() => handleStart(selectedCategory)}
            className="btn retry"
          >
            Retry &#10227;
          </button>
        </div>
      )}
      {status === "initial" && <StartScreen handleStart={handleStart} />}
      {status === "ready" && (
        <div>
          <div className="progress-container">
            <Timer time={timeRemaining} dispatch={dispatch} />
            <Progress
              index={index}
              numQuestions={numQuestions}
              answer={answer}
            />
          </div>
          <Question
            key={index}
            dispatch={dispatch}
            question={questions[index]}
            answer={answer}
          />
          <NextButton
            dispatch={dispatch}
            answer={answer}
            index={index}
            numQuestions={numQuestions}
          />
        </div>
      )}
      {status === "finished" && (
        <FinishScreen
          score={score}
          numQuestions={numQuestions}
          dispatch={dispatch}
        />
      )}
    </>
  );
}

export default App;
