import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("StickyNotes Component", () => {
  test("renders create note form", () => {
    render(<StickyNotes />);
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  test("creates a new note", () => {
    render(<StickyNotes />);
    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, {
      target: { value: "Note content" },
    });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  test("reads all created notes", () => {
    render(<StickyNotes />);
    // Assume we have some initial notes rendered
    const noteTitles = screen.getAllByRole('heading', { level: 3 });
    expect(noteTitles.length).toBeGreaterThan(0);
  });

  test("updates a note", () => {
    render(<StickyNotes />);
    const noteTitles = screen.getAllByRole('heading', { level: 3 });
    const firstNoteTitle = noteTitles[0];

    fireEvent.focus(firstNoteTitle);
    fireEvent.change(firstNoteTitle, { target: { textContent: "Updated Title" } });
    fireEvent.blur(firstNoteTitle);

    expect(screen.getByText("Updated Title")).toBeInTheDocument();
  });

  test("deletes a note", () => {
    render(<StickyNotes />);
    const deleteButtons = screen.getAllByText('x');
    const initialNotesCount = deleteButtons.length;

    fireEvent.click(deleteButtons[0]);

    const updatedDeleteButtons = screen.getAllByText('x');
    expect(updatedDeleteButtons.length).toBe(initialNotesCount - 1);
  });
});