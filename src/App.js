import React, { useState } from "react";
import Timer from "./components/Timer";

const App = () => {
  const [isTimer, setTimer] = useState(false);
  return (
    <div className="App">
      <h1 className="header">React App</h1>
      <button
        className="btn"
        onClick={() => {
          setTimer(!isTimer);
        }}
      >
        Click
      </button>
      {isTimer ? <Timer /> : <></>}
    </div>
  );
};

export default App;
