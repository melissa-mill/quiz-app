function FinishScreen({ score, numQuestions, dispatch }) {
  const percentage = Math.ceil((score / numQuestions) * 100);

  let icon = "🫠";

  if (percentage >= 80 && percentage <= 100) icon = "🥳";
  if (percentage >= 60 && percentage < 80) icon = "🤓";
  if (percentage >= 30 && percentage < 60) icon = "🧐";

  return (
    <>
      <p className="score">
        {icon} You scored {score} ({percentage}%)
      </p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        aria-label="Restart"
        className="btn restart"
      >
        Restart
      </button>
    </>
  );
}

export default FinishScreen;
