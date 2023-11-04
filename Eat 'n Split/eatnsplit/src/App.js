import { useState } from "react";
import FriendList from "./components/FriendList.js";
import AddFriendForm from "./components/AddFriendForm.js";
import SplitBillForm from "./components/SplitBillForm.js";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  const [friendList, setFriendList] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState("");
  function addFriend(newFriend) {
    setFriendList((friendList) => {
      return [...friendList, newFriend];
    });
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friendList={friendList}
          onAddFriend={addFriend}
          onSetSelectedFriend={setSelectedFriend}
        />
        <AddFriendForm onAddFriend={addFriend} />
      </div>
      {selectedFriend && (
        <SplitBillForm
          selectedFriend={selectedFriend}
          onSetFriendListBill={setFriendList}
          onSetSelectedFriend={setSelectedFriend}
        ></SplitBillForm>
      )}
    </div>
  );
}
