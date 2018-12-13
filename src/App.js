import React, { useState, useEffect, useRef } from "react";
import { useItems } from "./customHooks";
import "./App.css";
import TodoList from "./TodoList";
import TodoItems from "./TodoItems";

function App() {
  const [items, { fetchItems, addItem, deleteItem }] = useItems([]);
  const [currentItem, setCurrentItem] = useState({ text: "", key: "" });

  useEffect(fetchItems, []);

  const addNewItem = e => {
    addItem(e, currentItem);
    setCurrentItem({ text: "", key: "" });
  };

  const handleInput = e => {
    const itemText = e.target.value;
    const currentItem = { text: itemText, key: Date.now() };
    setCurrentItem(currentItem);
  };

  const inputElement = useRef(null);

  return (
    <div className="App">
      <TodoList
        addItem={addNewItem}
        inputElement={inputElement}
        handleInput={handleInput}
        currentItem={currentItem}
      />
      <TodoItems entries={items} deleteItem={deleteItem} />
    </div>
  );
}

export default App;
