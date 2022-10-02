import React, { useState, useRef, useEffect } from "react";

function setDefaultValue() {
  const userCount = localStorage.getItem("count");
  return userCount ? +userCount : 0;
}

const Timer = () => {
  const [count, setCount] = useState(setDefaultValue());
  const [isCounting, setIsCounting] = useState(false);
  const timerIdRef = useRef(null);

  const handleStart = () => {
    setIsCounting(true);
    timerIdRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  const handleStop = () => {
    clearInterval(timerIdRef.current);
    setIsCounting(false);
  };

  const handleReset = () => {
    setIsCounting(false);
    setCount((prev) => (prev = 0));
    clearInterval(timerIdRef.current);
  };

  useEffect(() => {
    console.log("Update");
    localStorage.setItem("count", count);
  }, [count]);

  useEffect(() => {
    if (isCounting) {
      timerIdRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      console.log("willUnMount");
      timerIdRef.current && clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    };
  }, [isCounting]);

  return (
    <>
      <h1 className="header">Timer React: {count}</h1>
      {!isCounting ? (
        <button className="btn start" onClick={handleStart}>
          Start
        </button>
      ) : (
        <button className="btn stop" onClick={handleStop}>
          Stop
        </button>
      )}
      <button className="btn secondary" onClick={handleReset}>
        Reset
      </button>
    </>
  );
};

export default Timer;
