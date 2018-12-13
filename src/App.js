import React, { useState, useEffect, useRef } from "react";
import http from "axios";
import "./App.css";
import TodoList from "./TodoList";
import TodoItems from "./TodoItems";

function useItems() {
  const [items, setItems] = useState([]);
  const fetchItems = async () => {
    try {
      const { data } = await http.get("/items");
      setItems(data.items);
    } catch (error) {
      console.error(error);
    }
  };
  const addItem = (e, currentItem) => {
    e.preventDefault();
    if (currentItem.text !== "") {
      const updatedItems = [...items, currentItem];
      setItems(updatedItems);
    }
  };
  const deleteItem = selectedItemKey => {
    const filteredItems = items.filter(item => item.key !== selectedItemKey);
    setItems(filteredItems);
  };

  return [items, { fetchItems, addItem, deleteItem }];
}

function App() {
  const [items, { fetchItems, addItem, deleteItem }] = useItems([]);
  const [currentItem, setCurrentItem] = useState({ text: "", key: "" });

  useEffect(() => {
    fetchItems();
  }, []);

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
