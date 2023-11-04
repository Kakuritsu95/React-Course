import { useState } from "react";
export default function AddFriendForm({ onAddFriend }) {
  const [toggleAddFriend, setToggleAddFriend] = useState(false);
  const [newFriendName, setNewFriendName] = useState("");
  const [newFriendImage, setNewFriendImage] = useState(
    "https://i.pravatar.cc/48?u=118836"
  );
  function addNewFriend(e) {
    if (!newFriendName) return;
    e.preventDefault();
    onAddFriend({
      id: Math.random(),
      name: newFriendName,
      image: newFriendImage,
      balance: 0,
    });
    setNewFriendName("");
    setNewFriendImage("https://i.pravatar.cc/48?u=118836");
    setToggleAddFriend((toggleAddFriend) => !toggleAddFriend);
  }
  return (
    <>
      {toggleAddFriend ? (
        <div className="form-add-friend">
          <form>
            <label>
              🧑‍🤝‍🧑Friend Name{" "}
              <input
                value={newFriendName}
                onChange={(e) => setNewFriendName(e.target.value)}
              ></input>
            </label>
            <label>
              📷 Image URL{" "}
              <input
                value={newFriendImage}
                onChange={(e) => setNewFriendImage(e.target.value)}
              ></input>
            </label>
            <button onClick={addNewFriend} type="Submit">
              Add
            </button>
          </form>
          <button
            onClick={() =>
              setToggleAddFriend((toggleAddFriend) => !toggleAddFriend)
            }
            className="button"
          >
            Close
          </button>
        </div>
      ) : (
        <button
          onClick={() =>
            setToggleAddFriend((toggleAddFriend) => !toggleAddFriend)
          }
          className="button"
        >
          Add Friend
        </button>
      )}
    </>
  );
}
