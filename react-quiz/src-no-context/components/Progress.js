function Progress({ index, numQuestions, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(Boolean(answer !== null))}
      />
      <p>
        Question <strong>{index + 1} </strong> / {numQuestions}
      </p>
      <p>{`${points}/${maxPoints}`}</p>
      <p></p>
    </header>
  );
}

export default Progress;
