import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";

export function ToDoList() {
  const { name } = useParams<{ name: string }>();
  const [items, setItems] = useState<GroceryItem[]>([]);
  const [numRemainingItems, setNumRemainingItems] = useState(0);

  useEffect(() => {
    // Load items from local storage or use dummy list if not available
    const storedItems = localStorage.getItem(`todoList_${name}`);
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    } else {
      setItems(dummyGroceryList);
    }
  }, [name]);

  useEffect(() => {
    // Save items to local storage whenever they change
    localStorage.setItem(`todoList_${name}`, JSON.stringify(items));
    // Update the count of purchased items
    setNumRemainingItems(items.filter(item => item.isPurchased).length);
  }, [items, name]);

  function handleCheckboxClick(itemName: string) {
    setItems(prevItems =>
      prevItems.map(item =>
        item.name === itemName ? { ...item, isPurchased: !item.isPurchased } : item
      )
    );
  }

  return (
    <div className="App">
      <div className="App-body">
        <h1>{name}'s To Do List</h1>
        <p>Items bought: {numRemainingItems}</p>
        <form>
          {items.map((item) => (
            <div key={item.name}>
              <input
                type="checkbox"
                checked={item.isPurchased}
                onChange={() => handleCheckboxClick(item.name)}
                name={item.name}
              />
              {item.name}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}