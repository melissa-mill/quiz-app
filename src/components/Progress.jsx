function Progress({ index, numQuestions, answer }) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        {index + 1}/{numQuestions}
      </p>
    </div>
  );
}

export default Progress;
