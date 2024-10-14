import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
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

  // ... existing tests ...

  // Edge case: Create note with empty fields
  test("cannot create note with empty fields", () => {
    const createNoteButton = screen.getByText("Create Note");
    fireEvent.click(createNoteButton);

    const errorMessage = screen.getByText('Please fill in all fields');
    expect(errorMessage).toBeInTheDocument();
  });

  // Edge case: Create note with very long title
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
});