export default function Friend({ friend, children, onSetSelectedFriend }) {
  return (
    <li>
      <img alt="Friend" src={friend.image} />
      <div>
        <h3>{friend.name}</h3>
        <p>{children}</p>
      </div>
      <button
        className="button"
        onClick={() => {
          onSetSelectedFriend(friend);
        }}
      >
        Select
      </button>
    </li>
  );
}
