import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./App.css";
import { GroceryItem } from "./types";
import { dummyGroceryList } from "./constants";

export function ToDoList() {
  const { name } = useParams<{ name: string }>();
  const [items, setItems] = useState<GroceryItem[]>(dummyGroceryList);
  const [numBoughtItems, setNumBoughtItems] = useState(0);

  useEffect(() => {
    const boughtItems = items.filter(item => item.isPurchased).length;
    setNumBoughtItems(boughtItems);
  }, [items]);

  function handleCheckboxClick(itemName: string) {
    setItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.name === itemName ? { ...item, isPurchased: !item.isPurchased } : item
      );
      return sortItems(updatedItems);
    });
  }

  function sortItems(items: GroceryItem[]): GroceryItem[] {
    return [
      ...items.filter(item => !item.isPurchased),
      ...items.filter(item => item.isPurchased)
    ];
  }

  return (
    <div className="App">
      <div className="App-body">
        <h1>{name}'s To Do List</h1>
        <p>Items bought: {numBoughtItems}</p>
        <form action=".">
          {items.map((item) => (
            <div key={item.name}>
              <input
                type="checkbox"
                checked={item.isPurchased}
                onChange={() => handleCheckboxClick(item.name)}
                name={item.name}
                aria-label={item.name}
              />
              {item.name}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}
