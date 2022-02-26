import { useState } from "react";
import Start from "./components/Start";
import Quiz from "./components/Quiz";

function App() {
  const [isStart, setIsStart] = useState(true);
  return (
    <div className="App">
      {isStart ? <Start handleClick={() => setIsStart(false)} /> : <Quiz />}
    </div>
  );
}

export default App;
