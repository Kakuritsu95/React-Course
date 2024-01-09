export default function Badge(props) {
  return (
    <div>
      <span className="skill" style={{ backgroundColor: props.bgColor }}>
        {props.text} {props.emoji}{" "}
      </span>
    </div>
  );
}
r;
