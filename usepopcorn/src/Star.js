import { useState } from "react";
function StarComponent({ maxVote }) {
  const [curRate, setCurRate] = useState("1");
  const stars = Array.from({ length: maxVote }, (_, i) => "s" + String(i + 1));

  return (
    <div>
      <ul style={{ fontSize: "20px" }}>
        {stars.map((star, i) => (
          <Star
            onSetRate={setCurRate}
            curRate={curRate}
            key={i}
            star={star}
            value={i + 1}
          />
        ))}
      </ul>
      <span>{curRate}</span>
    </div>
  );
}

function Star({ star, value, curRate, onSetRate }) {
  return (
    <span
      onMouseEnter={() => onSetRate(value.toString())}
      onMouseOut={() => onSetRate(1)}
      onClick={() => console.log(value)}
      style={
        curRate >= value ? { margin: "5px", color: "green" } : { margin: "5px" }
      }
    >
      {star}
    </span>
  );
}

export { StarComponent as Star };
