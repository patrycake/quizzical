export default function Start({ handleClick }) {
  return (
    <div className="start-container bg">
      <header className="header">
        <h1>Quizzical</h1>
        <p>Click on Start to start the quiz!</p>
      </header>
      <button className="main-butt butt" onClick={handleClick}>
        Start Quiz
      </button>
    </div>
  );
}
