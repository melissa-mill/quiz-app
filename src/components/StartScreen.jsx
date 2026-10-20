function StartScreen({ handleStart }) {
  return (
    <div className="divide_screen">
      <p className="description">Pick a subject to get started</p>
      <div className="categories">
        <button
          value={12}
          onClick={() => handleStart(12)}
          className="btn category music"
        >
          Music
        </button>
        <button
          value={11}
          onClick={() => handleStart(11)}
          className="btn category film"
        >
          Film
        </button>
        <button
          value={21}
          onClick={() => handleStart(21)}
          className="btn category sports"
        >
          Sports
        </button>
        <button
          value={9}
          onClick={() => handleStart(9)}
          className="btn category general"
        >
          General knowledge
        </button>
      </div>
    </div>
  );
}

export default StartScreen;
