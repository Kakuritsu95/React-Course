import Friend from "./Friend";
export default function FriendList({ friendList, onSetSelectedFriend }) {
  /* id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7, */
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
