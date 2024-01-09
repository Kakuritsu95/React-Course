import { useEffect, useRef } from "react";
function Timer({ dispatch, timer }) {
  if (timer === 0) {
    dispatch({ type: "finish" });
  }
  const interval = useRef();
  useEffect(() => {
    interval.current = setInterval(() => {
      dispatch({ type: "timerStart", payload: 1 });
    }, 1000);
    return () => {
      clearInterval(interval.current);
    };
  }, [dispatch]);
  return (
    <span className="timer">
      {`${Math.floor(timer / 60)
        .toString()
        .padStart(2, 0)}:${(timer % 60).toString().padStart(2, 0)}`}
    </span>
  );
}

export default Timer;
