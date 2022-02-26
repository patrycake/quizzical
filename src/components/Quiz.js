import { useEffect, useState } from "react";
import Question from "./Question";
import uniqid from "uniqid";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(
    questions.map((ques) => ques.correct_answer)
  );
  useEffect(() => console.log("questions: ", questions), [questions]);
  useEffect(() => {
    // console.log("run fetch");
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(
          data.results.map((elm) => ({
            ...elm,
            id: uniqid(),
          }))
        );
      });
  }, []);

  function setOneAnswer(index, ans) {
    setAnswers((prev) => {
      prev.splice(index, 1, ans);
    });
  }

  const quesElem = questions.map((que, index) => (
    <Question
      key={uniqid()}
      id={que.id}
      ques={JSON.stringify(que.question)}
      opts={que.incorrect_answers.map((ans) => JSON.stringify(ans))}
      setAnswer={(ans) => setOneAnswer(index, ans)}
      answer={answers[index]}
    />
  ));
  function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");
  }
  return (
    <div className="quiz-container bg">
      <form onSubmit={handleSubmit}>
        {quesElem}
        <div className="butt-container check-container">
          <button className="butt main-butt">Check Answers</button>
        </div>
      </form>
    </div>
  );
}
