import React, { useState, useEffect } from 'react';
import './App.css';
import { Note, Label } from "./types";
import { dummyNotesList } from "./constants";
import { ThemeContext, themes } from "./ThemeContext";
import { ToDoList } from "./ToDoList";
import { StickyNotes } from "./StickyNotes";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar";

function App() {
  const [theme, setTheme] = useState(themes.light);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.foreground;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === themes.light ? themes.dark : themes.light);
  };

  const toggleFavoriteHandler = (title: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(title)
        ? prevFavorites.filter(fav => fav !== title)
        : [...prevFavorites, title]
    );
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className='app-container' style={{ backgroundColor: theme.background, color: theme.foreground }}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <h1>Triton Notes</h1>
              <button className="toggle-theme" onClick={toggleTheme}>Toggle Theme</button>
              <StickyNotes 
                initialNotes={dummyNotesList} 
                initialFavorites={favorites} 
                onToggleFavorite={toggleFavoriteHandler} 
              />
            </>
          } />
          <Route path="/todolist/:name" element={<ToDoList />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
