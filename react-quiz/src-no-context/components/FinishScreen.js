function FinishScreen({ points, maxPoints, highscore, dispatch }) {
  const persentage = Math.floor((points * 100) / maxPoints);
  let emoji;

  if (persentage === 100) emoji = "🏅";
  if (persentage >= 80 && persentage < 100) emoji = "🎉";
  if (persentage >= 50 && persentage < 80) emoji = "🏅";
  if (persentage >= 30 && persentage < 50) emoji = "😓";
  if (persentage >= 0 && persentage < 30) emoji = "😓";
  if (persentage === 0) emoji = "🤦🏻";
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} Points (
        {persentage.toString()}%) {emoji}
      </p>
      <p className="highscore">Highscore: {highscore} Points </p>
      <button
        onClick={() => dispatch({ type: "reset" })}
        className="btn btn-ui"
      >
        Restart!
      </button>
    </>
  );
}
export default FinishScreen;
