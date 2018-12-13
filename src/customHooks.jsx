import { useState } from "react";
import http from "axios";

export function useItems() {
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
