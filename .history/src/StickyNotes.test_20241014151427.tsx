import React from 'react';
import { render, screen, fireEvent, within } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

describe("StickyNotes Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  test("renders create note form", () => {
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(titleInput, { target: { value: "New Note" } });
    fireEvent.change(contentTextarea, { target: { value: "Note content" } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("reads all created notes", () => {
    const noteTitles = screen.getAllByRole('heading', { level: 3 });
    expect(noteTitles.length).toBeGreaterThan(0);
  });

  test("updates a note", () => {
    const noteTitles = screen.getAllByRole('heading', { level: 3 });
    const firstNoteTitle = noteTitles[0];

    fireEvent.focus(firstNoteTitle);
    fireEvent.change(firstNoteTitle, { target: { textContent: "Updated Title" } });
    fireEvent.blur(firstNoteTitle);

    expect(screen.getByText("Updated Title")).toBeInTheDocument();
  });

  test("deletes a note", () => {
    const deleteButtons = screen.getAllByText('x');
    const initialNotesCount = deleteButtons.length;

    fireEvent.click(deleteButtons[0]);

    const updatedDeleteButtons = screen.getAllByText('x');
    expect(updatedDeleteButtons.length).toBe(initialNotesCount - 1);
  });

  test("cannot create note with empty fields", () => {
    const createNoteButton = screen.getByText("Create Note");
    fireEvent.click(createNoteButton);

    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeInTheDocument();
  });

  test("creates note with long title", () => {
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    const longTitle = 'A'.repeat(100);
    fireEvent.change(titleInput, { target: { value: longTitle } });
    fireEvent.change(contentTextarea, { target: { value: "Content" } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText(longTitle);
    expect(newNoteTitle).toBeInTheDocument();
  });

  test("text entered in form matches created note", () => {
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    const testTitle = "Test Title";
    const testContent = "Test Content";

    fireEvent.change(titleInput, { target: { value: testTitle } });
    fireEvent.change(contentTextarea, { target: { value: testContent } });
    fireEvent.click(createNoteButton);

    const createdNoteTitle = screen.getByText(testTitle);
    const createdNoteContent = screen.getByText(testContent);

    expect(createdNoteTitle).toBeInTheDocument();
    expect(createdNoteContent).toBeInTheDocument();
  });

  test("creates multiple notes", () => {
    const initialNotesCount = screen.getAllByText('x').length;

    for (let i = 0; i < 3; i++) {
      const titleInput = screen.getByPlaceholderText("Note Title");
      const contentTextarea = screen.getByPlaceholderText("Note Content");
      const createNoteButton = screen.getByText("Create Note");

      fireEvent.change(titleInput, { target: { value: `Note ${i + 1}` } });
      fireEvent.change(contentTextarea, { target: { value: `Content ${i + 1}` } });
      fireEvent.click(createNoteButton);
    }

    const finalNotesCount = screen.getAllByText('x').length;
    expect(finalNotesCount).toBe(initialNotesCount + 3);
  });

  test("deletes all notes", () => {
    const deleteButtons = screen.getAllByText('x');
    deleteButtons.forEach(button => fireEvent.click(button));

    const remainingNotes = screen.queryAllByRole('heading', { level: 3 });
    expect(remainingNotes.length).toBe(0);
  });

  test("creates note with special characters", () => {
    const titleInput = screen.getByPlaceholderText("Note Title");
    const contentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    const specialTitle = "📝 <b>Special</b> Title";
    const specialContent = "🚀 <i>Special</i> Content";

    fireEvent.change(titleInput, { target: { value: specialTitle } });
    fireEvent.change(contentTextarea, { target: { value: specialContent } });
    fireEvent.click(createNoteButton);

    const createdNoteTitle = screen.getByText("📝 <b>Special</b> Title");
    const createdNoteContent = screen.getByText("🚀 <i>Special</i> Content");

    expect(createdNoteTitle).toBeInTheDocument();
    expect(createdNoteContent).toBeInTheDocument();
  });

  test("updates note with empty content", () => {
    const noteTitles = screen.getAllByRole('heading', { level: 3 });
    const firstNoteContent = noteTitles[0].nextElementSibling as HTMLElement;

    fireEvent.focus(firstNoteContent);
    fireEvent.change(firstNoteContent, { target: { textContent: "" } });
    fireEvent.blur(firstNoteContent);

    expect(firstNoteContent.textContent).toBe("");
  });
});