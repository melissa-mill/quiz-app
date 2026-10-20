function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        aria-label="Next"
        className="continue_btn"
      >
        Next &rarr;
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "finish" })}
        aria-label="Finish"
        className="continue_btn"
      >
        Finish
      </button>
    );
}

export default NextButton;
