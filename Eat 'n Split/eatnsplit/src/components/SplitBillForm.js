import { useState } from "react";
export default function SplitBillForm({
  selectedFriend,
  onSetFriendListBill,
  onSetSelectedFriend,
}) {
  const [inputs, setInputs] = useState({
    billValue: 0,
    expense: 0,
    paidOne: "You",
  });
  function handleSplitBill() {
    onSetFriendListBill((friendList) => {
      return friendList.map((friend) => {
        return friend.id === selectedFriend.id
          ? { ...friend, balance: (friend.balance = friend.balance + balance) }
          : friend;
      });
    });
  }
  function updateInputs(input, value) {
    setInputs((inputs) => {
      return { ...inputs, [input]: value };
    });
  }
  const balance =
    inputs.paidOne === "You"
      ? inputs.billValue - inputs.expense
      : -inputs.expense;
  return (
    <div className="form-split-bill">
      <form>
        <h3>Split bill with {selectedFriend.name}</h3>
        <label>
          💰Bill Value{" "}
          <input
            type="number"
            min={0}
            value={inputs.billValue}
            onChange={(e) => updateInputs("billValue", Number(e.target.value))}
          ></input>
        </label>
        <label>
          🕴️Your expense{" "}
          <input
            type="number"
            min={0}
            value={inputs.expense}
            onChange={(e) => updateInputs("expense", Number(e.target.value))}
          ></input>
        </label>
        <label>
          🧑‍🤝‍🧑{selectedFriend.name}s expense{" "}
          <input
            type="number"
            disabled
            value={inputs.billValue - inputs.expense}
          ></input>
        </label>
        <label>
          💰Who paid?
          <select
            value={inputs.paidOne}
            onChange={(e) => updateInputs("paidOne", e.target.value)}
          >
            <option>You</option>
            <option>{selectedFriend.name}</option>
          </select>
        </label>
        <div>
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              handleSplitBill();
              onSetSelectedFriend("");
            }}
          >
            Split Bill
          </button>
        </div>
      </form>
    </div>
  );
}
