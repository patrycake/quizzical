import uniqid from "uniqid";
export default function Question({ id, ques, opts, setAnswer, answer }) {
  console.log(opts);
  const optionsElem = opts.map((opt, index) => (
    <div key={uniqid()}>
      <input
        type="radio"
        name={id}
        id={`ans${index}`}
        value={opt}
        className="checkbox"
        checked={answer === opt}
        onChange={() => setAnswer(opt)}
      />
      <label
        htmlFor={`ans${index}`}
        className={answer === opt ? "ques-butt click-butt" : "ques-butt"}
      >
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
