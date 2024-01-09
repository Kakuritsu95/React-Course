function Option({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, i) => {
        return (
          <button
            key={option}
            className={`btn btn-option ${i === answer && "answer"} 
              ${
                hasAnswered &&
                (i === question.correctOption ? "correct" : "wrong")
              }
              `}
            onClick={() => dispatch({ type: "newAnswer", payload: i })}
            disabled={hasAnswered}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Option;
