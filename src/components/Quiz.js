import { useEffect, useState } from "react";
import Question from "./Question";
import uniqid from "uniqid";
import { unescape } from "underscore";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(new Array(5).fill("-"));
  const [isSubmit, setIsSubmit] = useState(false);
  const [submitText, setSubmitText] = useState("");

  function add(array, item) {
    array.push(item);
    return array;
  }
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    if (!isSubmit) {
      fetch("https://opentdb.com/api.php?amount=5")
        .then((res) => res.json())
        .then((data) => {
          setQuestions(
            data.results.map((elm) => ({
              ...elm,
              incorrect_answers: shuffleArray(
                add(elm.incorrect_answers, elm.correct_answer)
              ),
              id: uniqid(),
            }))
          );
        });
    }
  }, [isSubmit]);

  function handleOneAnswerChange(event, index) {
    setAnswers((prev) => {
      prev.splice(index, 1, event.target.value);
      return [...prev];
    });
  }

  function countCorrect() {
    let num = answers.reduce((prev, item, index) => {
      return JSON.parse(item) === questions[index].correct_answer
        ? prev + 1
        : prev;
    }, 0);
    return num;
  }

  const quesElem = questions.map((que, index) => {
    // console.log(que.question);
    // console.log(_.unescape(que.question));
    // console.log(_.unescape(que.question));
    return (
      <Question
        key={uniqid()}
        id={que.id}
        position={index}
        ques={unescape(que.question)}
        ans={unescape(que.correct_answer.toString())}
        opts={que.incorrect_answers.map((item) =>
          unescape(JSON.stringify(item))
        )}
        handleChange={handleOneAnswerChange}
        answer={answers[index]}
        isSubmit={isSubmit}
      />
    );
  });

  function handleSubmit(event) {
    event.preventDefault();

    if (isSubmit) {
      //play again
      setIsSubmit(false);
      setSubmitText("");
      setAnswers(new Array(5).fill("-"));
      setQuestions([]);
    }
    if (!answers.every((ans) => ans !== "-")) {
      setSubmitText("Must answer all the questions to move on");
    }
    if (!isSubmit && answers.every((ans) => ans !== "-")) {
      setIsSubmit(true);
      setSubmitText(
        `You scored ${countCorrect()}/${answers.length} correct answers`
      );
    }
  }
  return (
    <div className="quiz-container bg">
      <form onSubmit={handleSubmit}>
        {quesElem}
        <div className="butt-container check-container">
          <span>{submitText}</span>
          <button className="butt main-butt">
            {isSubmit ? "Play Again" : "Check Answers"}
          </button>
        </div>
      </form>
    </div>
  );
}
