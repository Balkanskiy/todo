import React, { useState, useEffect, useRef } from "react";
import http from "axios";
import "./App.css";
import TodoList from "./TodoList";
import TodoItems from "./TodoItems";

async function useFetchItems() {
  try {
    const { data } = await http.get("/items");
    return data.items;
  } catch (error) {
    console.error(error);
  }
  return [];
}

function App() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    text: "",
    key: ""
  });

  useEffect(() => {
    setItems(useFetchItems);
  }, []);

  const handleInput = e => {
    const itemText = e.target.value;
    const currentItem = { text: itemText, key: Date.now() };
    setCurrentItem(currentItem);
  };

  const deleteItem = key => {
    const filteredItems = items.filter(item => item.key !== key);
    setItems(filteredItems);
  };

  const addItem = e => {
    e.preventDefault();
    const newItem = currentItem;
    if (newItem.text !== "") {
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      setCurrentItem({ text: "", key: "" });
    }
  };

  const inputElement = useRef(null);

  return (
    <div className="App">
      <TodoList
        addItem={addItem}
        inputElement={inputElement}
        handleInput={handleInput}
        currentItem={currentItem}
      />
      <TodoItems entries={items} deleteItem={deleteItem} />
    </div>
  );
}

export default App;
