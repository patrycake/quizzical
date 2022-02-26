import uniqid from "uniqid";
export default function Question({
  ques,
  ans,
  opts,
  position,
  handleChange,
  answer,
  isSubmit,
}) {
  function getClassName(opt) {
    // console.log(opt, answer, answer === opt, isSubmit);
    if (isSubmit) {
      if (answer === opt && answer === ans) return "right-butt ques-butt";
      if (answer === opt && answer !== ans) return "wrong-butt ques-butt";
      else return "results-butt";
    } else {
      if (answer === opt) return "ques-butt click-butt";
      else return "ques-butt";
    }
  }

  const optionsElem = opts.map((opt, index) => (
    <div key={uniqid()}>
      <input
        type="radio"
        name={`ans${position}`}
        id={opt + position}
        value={opt}
        className="radio"
        checked={answer === opt}
        onChange={(event) => handleChange(event, position)}
      />
      <label htmlFor={opt + position} className={getClassName(opt)}>
        {opt}
      </label>
    </div>
  ));

  return (
    <div className="ques-container">
      <p>{ques.replace(/&quot;/g, '"')}</p>
      <div className="butt-container ">{optionsElem}</div>
      <hr />
    </div>
  );
}
