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

  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.foreground;
  }, [theme]);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote: Note = {
      ...createNote,
      id: notes.length + 1,
    };
    setNotes([...notes, newNote]);
    setCreateNote({ id: -1, title: "", content: "", label: Label.other });
  };

  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    setFavorites(favorites.filter(fav => fav !== notes.find(note => note.id === id)?.title));
  };

  const updateNoteHandler = (updatedNote: Note) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  const toggleFavoriteHandler = (title: string) => {
    setFavorites(prevFavorites => 
      prevFavorites.includes(title)
        ? prevFavorites.filter(fav => fav !== title)
        : [...prevFavorites, title]
    );
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === themes.light ? themes.dark : themes.light);
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
              
              <div className="content-container">
                <div className="left-column" style={{ backgroundColor: theme === themes.light ? 'white' : '#333' }}>
                  <form className="note-form" onSubmit={createNoteHandler}>
                    <input
                      placeholder="Note Title"
                      value={createNote.title}
                      onChange={(e) => setCreateNote({ ...createNote, title: e.target.value })}
                      required
                      style={{ backgroundColor: theme === themes.light ? 'white' : '#444', color: theme.foreground }}
                    />
                    <textarea
                      placeholder="Note Content"
                      value={createNote.content}
                      onChange={(e) => setCreateNote({ ...createNote, content: e.target.value })}
                      required
                      style={{ backgroundColor: theme === themes.light ? 'white' : '#444', color: theme.foreground }}
                    />
                    <select
                      value={createNote.label}
                      onChange={(e) => setCreateNote({ ...createNote, label: e.target.value as Label })}
                      required
                      style={{ backgroundColor: theme === themes.light ? 'white' : '#444', color: theme.foreground }}
                    >
                      <option value={Label.other}>Other</option>
                      <option value={Label.personal}>Personal</option>
                      <option value={Label.study}>Study</option>
                      <option value={Label.work}>Work</option>
                    </select>
                    <button type="submit">Create Note</button>
                  </form>

                  <h2>Favorite Notes</h2>
                  <ul className="favorites-list">
                    {favorites.map((title, index) => (
                      <li key={index}>{title}</li>
                    ))}
                  </ul>
                </div>

                <div className="right-column">
                  <div className="notes-grid">
                    {notes.map((note) => (
                      <div key={note.id} className="note-item" style={{ backgroundColor: theme === themes.light ? 'white' : '#333' }}>
                        <div className="note-header">
                          <button 
                            className={`favorite-btn ${favorites.includes(note.title) ? 'favorited' : ''}`}
                            onClick={() => toggleFavoriteHandler(note.title)}
                          >
                            ♥
                          </button>
                          <button className="delete-btn" onClick={() => deleteNoteHandler(note.id)}>x</button>
                        </div>
                        <h3
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => updateNoteHandler({ ...note, title: e.currentTarget.textContent || "" })}
                          style={{ color: theme.foreground }}
                        >
                          {note.title}
                        </h3>
                        <p
                          contentEditable
                          suppressContentEditableWarning
                          onBlur={(e) => updateNoteHandler({ ...note, content: e.currentTarget.textContent || "" })}
                          style={{ color: theme.foreground }}
                        >
                          {note.content}
                        </p>
                        <select
                          value={note.label}
                          onChange={(e) => updateNoteHandler({ ...note, label: e.target.value as Label })}
                          style={{ backgroundColor: theme === themes.light ? 'white' : '#444', color: theme.foreground }}
                        >
                          <option value={Label.other}>Other</option>
                          <option value={Label.personal}>Personal</option>
                          <option value={Label.study}>Study</option>
                          <option value={Label.work}>Work</option>
                        </select>
                      </div>
                    ))}
                  </div>
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