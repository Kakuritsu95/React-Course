export default function Stats({ items }) {
  const packedNumber = items.reduce(
    (acc, cur) => (cur.packed ? (acc += 1) : acc),
    0
  );

  return (
    <footer className="stats">
      <em>
        {" "}
        You have {items.length} items on your list, and you already packed{" "}
        {packedNumber} ({((packedNumber / items.length) * 100).toFixed()}% of
        your list)
      </em>
    </footer>
  );
}
