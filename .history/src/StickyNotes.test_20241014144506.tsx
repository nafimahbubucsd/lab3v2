import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('StickyNotes Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  test('renders create note form', () => {
    const createNoteButton = screen.getByText('Create Note');
    expect(createNoteButton).toBeInTheDocument();
  });

  test('creates a new note', () => {
    const titleInput = screen.getByPlaceholderText('Note Title');
    const contentTextarea = screen.getByPlaceholderText('Note Content');
    const createNoteButton = screen.getByText('Create Note');

    fireEvent.change(titleInput, { target: { value: 'New Note Title' } });
    fireEvent.change(contentTextarea, { target: { value: 'New Note Content' } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText('New Note Title');
    const newNoteContent = screen.getByText('New Note Content');

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test('deletes a note', () => {
    const deleteButtons = screen.getAllByText('x');
    const initialNotesCount = deleteButtons.length;

    fireEvent.click(deleteButtons[0]);

    const updatedDeleteButtons = screen.getAllByText('x');
    expect(updatedDeleteButtons.length).toBe(initialNotesCount - 1);
  });

  test('updates a note', () => {
    const noteTitles = screen.getAllByRole('heading', { level: 3 });
    const originalTitle = noteTitles[0].textContent || '';

    fireEvent.focus(noteTitles[0]);
    fireEvent.change(noteTitles[0], { target: { textContent: 'Updated Title' } });
    fireEvent.blur(noteTitles[0]);

    const updatedTitle = screen.getByText('Updated Title');
    expect(updatedTitle).toBeInTheDocument();
    if (originalTitle) {
      expect(screen.queryByText(originalTitle)).not.toBeInTheDocument();
    }
  });

  test('toggles favorite status of a note', () => {
    const favoriteButtons = screen.getAllByText('♥');
    const initialFavoritesCount = screen.queryAllByRole('listitem').length;

    fireEvent.click(favoriteButtons[0]);

    const updatedFavoritesCount = screen.queryAllByRole('listitem').length;
    expect(updatedFavoritesCount).toBe(initialFavoritesCount + 1);
  });

  // Edge case: Create note with empty fields
  test('cannot create note with empty fields', () => {
    const createNoteButton = screen.getByText('Create Note');
    fireEvent.click(createNoteButton);

    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeInTheDocument();
  });

  // Edge case: Create note with very long title
  test('creates note with long title', () => {
    const titleInput = screen.getByPlaceholderText('Note Title');
    const contentTextarea = screen.getByPlaceholderText('Note Content');
    const createNoteButton = screen.getByText('Create Note');

    const longTitle = 'A'.repeat(100);
    fireEvent.change(titleInput, { target: { value: longTitle } });
    fireEvent.change(contentTextarea, { target: { value: 'Content' } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText(longTitle);
    expect(newNoteTitle).toBeInTheDocument();
  });
});