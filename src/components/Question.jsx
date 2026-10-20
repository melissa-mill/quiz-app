import Options from "./Options";

function Question({ question, dispatch, answer }) {
  const correctAnswer = question.correct_answer;
  const parser = new DOMParser();
  const parsedQuestion = parser.parseFromString(question.question, "text/html")
    .body.textContent;

  return (
    <div className="divide_screen">
      <h3 className="question">{parsedQuestion}</h3>
      <Options
        options={question.shuffledAnswers}
        dispatch={dispatch}
        answer={answer}
        correct={correctAnswer}
      />
    </div>
  );
}

export default Question;
