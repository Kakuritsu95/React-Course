import Friend from "./Friend";
export default function FriendList({ friendList, onSetSelectedFriend }) {
  return (
    <ul>
      {friendList.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSetSelectedFriend={onSetSelectedFriend}
        >
          <p> {friend.balance} </p>
        </Friend>
      ))}
    </ul>
  );
}
