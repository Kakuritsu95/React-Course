import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";
export default function App() {
  const [itemList, setItemlist] = useState([]);
  function onReset() {
    setItemlist([]);
  }
  function updateItem(id) {
    setItemlist((i) =>
      i.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function removeItem(id) {
    setItemlist((itemList) => itemList.filter((it) => it.id !== id));
  }

  function addItem(item) {
    setItemlist((i) => [...i, item]);
  }
  return (
    <div className="app">
      <Logo />
      <Form addItem={addItem} />
      <PackingList
        items={itemList}
        onRemoveItem={removeItem}
        onUpdateItem={updateItem}
        onReset={onReset}
      />
      <Stats items={itemList} />
    </div>
  );
}
