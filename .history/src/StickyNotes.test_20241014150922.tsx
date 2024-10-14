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

  // ... other tests ...
});