import { useEffect } from "react";

function Timer({ time, dispatch }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  return (
    <p className="timer">
      {minutes < 10 ? "0" : ""}
      {minutes}:{seconds < 10 ? "0" : ""}
      {seconds}
    </p>
  );
}

export default Timer;
