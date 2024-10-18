import React, { useState } from 'react';
import { Label, Note } from "./types";
import './App.css'; // Use same styling

interface StickyNotesProps {
  initialNotes: Note[];
  initialFavorites: string[];
  onToggleFavorite: (title: string) => void;
}

export function StickyNotes({ initialNotes, initialFavorites, onToggleFavorite }: StickyNotesProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [createNote, setCreateNote] = useState<Note>({
    id: -1,
    title: "",
    content: "",
    label: Label.other,
  });
  const [favorites, setFavorites] = useState<string[]>(initialFavorites);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  const deleteNoteHandler = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    setFavorites(favorites.filter(fav => fav !== notes.find(note => note.id === id)?.title));
  };

  const updateNoteHandler = (updatedNote: Note) => {
    setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
  };

  return (
    <div className="content-container">
      <div className="left-column">
        <form className="note-form" onSubmit={createNoteHandler}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <input
            placeholder="Note Title"
            value={createNote.title}
            onChange={(e) => setCreateNote({ ...createNote, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Note Content"
            value={createNote.content}
            onChange={(e) => setCreateNote({ ...createNote, content: e.target.value })}
            required
          />
          <select
            value={createNote.label}
            onChange={(e) => setCreateNote({ ...createNote, label: e.target.value as Label })}
            required
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
            <div key={note.id} className="note-item">
              <div className="note-header">
                <button 
                  className={`favorite-btn ${favorites.includes(note.title) ? 'favorited' : ''}`}
                  onClick={() => onToggleFavorite(note.title)}
                >
                  ♥
                </button>
                <button className="delete-btn" onClick={() => deleteNoteHandler(note.id)}>x</button>
              </div>
              <h3
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateNoteHandler({ ...note, title: e.currentTarget.textContent || "" })}
              >
                {note.title}
              </h3>
              <p
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => updateNoteHandler({ ...note, content: e.currentTarget.textContent || "" })}
              >
                {note.content}
              </p>
              <select
                value={note.label}
                onChange={(e) => updateNoteHandler({ ...note, label: e.target.value as Label })}
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
  );
}