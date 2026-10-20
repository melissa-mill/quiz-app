function Options({ options, dispatch, answer, correct }) {
  const parser = new DOMParser();

  return (
    <div className="options">
      {options.map((option, i) => {
        const parsedOption = parser.parseFromString(option, "text/html").body
          .textContent;

        return (
          <button
            key={i}
            onClick={() => dispatch({ type: "newAnswer", payload: option })}
            disabled={answer !== null}
            aria-label={parsedOption}
            className={`btn ${answer && option === correct ? "correct" : ""} ${answer === option ? "selected" : ""}`}
          >
            {parsedOption}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
