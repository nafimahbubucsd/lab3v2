import React, { useState, useEffect } from 'react';
import './App.css';
import { Label, Note } from "./types";
import { dummyNotesList } from "./constants";
import { ThemeContext, themes } from "./ThemeContext";
import { ToDoList } from "./toDoList";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar";

function App() {
  const [notes, setNotes] = useState<Note[]>(dummyNotesList);
  const [createNote, setCreateNote] = useState<Note>({
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  });
  const [favorites, setFavorites] = useState<string[]>([]);
  const [theme, setTheme] = useState(themes.light);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.foreground;
  }, [theme]);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!createNote.title || !createNote.content) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    setErrorMessage(null);
    const newNote: Note = {
      ...createNote,
      id: notes.length + 1,
    };
    setNotes([...notes, newNote]);
    setCreateNote({ id: -1, title: "", content: "", label: Label.other });
  };

  // ... rest of the component code ...

  return (
    <ThemeContext.Provider value={theme}>
      <div className='app-container' style={{ backgroundColor: theme.background, color: theme.foreground }}>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <h1>Triton Notes</h1>
              <button className="toggle-theme" onClick={toggleTheme}>Toggle Theme</button>
              
              <div className="content-container">
                <div className="left-column" style={{ backgroundColor: theme === themes.light ? 'white' : '#333' }}>
                  <form className="note-form" onSubmit={createNoteHandler}>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {/* ... form inputs ... */}
                    <button type="submit">Create Note</button>
                  </form>

                  {/* ... rest of the component JSX ... */}
                </div>
              </div>
            </>
          } />
          <Route path="/todolist/:name" element={<ToDoList />} />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;