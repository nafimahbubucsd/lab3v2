import { render, screen, fireEvent } from "@testing-library/react";
import { StickyNotes } from "./StickyNotes";
import { BrowserRouter } from "react-router-dom"; 
import { Label } from "./types";

describe("StickyNotes Component", () => {

  // Test 1: Create note form renders
  test("renders create note form", () => {
    render(<StickyNotes initialNotes={[]} initialFavorites={[]} onToggleFavorite={jest.fn()} />);
    
    const createNoteButton = screen.getByText("Create Note");
    expect(createNoteButton).toBeInTheDocument();
  });

  // Test 2: Create a new note
  test("creates a new note", () => {
    render(<StickyNotes initialNotes={[]} initialFavorites={[]} onToggleFavorite={jest.fn()} />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
    fireEvent.change(createNoteContentTextarea, { target: { value: "Note content" } });
    fireEvent.click(createNoteButton);

    const newNoteTitle = screen.getByText("New Note");
    const newNoteContent = screen.getByText("Note content");

    expect(newNoteTitle).toBeInTheDocument();
    expect(newNoteContent).toBeInTheDocument();
  });

  // Test 3: Read all created notes
  test("displays all created notes", () => {
    const initialNotes = [
      { id: 1, title: "Note 1", content: "Content 1", label: Label.other },
      { id: 2, title: "Note 2", content: "Content 2", label: Label.personal }
    ];
    
    render(<StickyNotes initialNotes={initialNotes} initialFavorites={[]} onToggleFavorite={jest.fn()} />);

    const note1 = screen.getByText("Note 1");
    const note2 = screen.getByText("Note 2");

    expect(note1).toBeInTheDocument();
    expect(note2).toBeInTheDocument();
  });

  // Test 4: Update an existing note
  test("updates a note", () => {
    const initialNotes = [
      { id: 1, title: "Old Note", content: "Old Content", label: Label.other }
    ];

    render(<StickyNotes initialNotes={initialNotes} initialFavorites={[]} onToggleFavorite={jest.fn()} />);

    const noteTitle = screen.getByText("Old Note");
    fireEvent.blur(noteTitle, { target: { textContent: "Updated Note" } });

    expect(screen.getByText("Updated Note")).toBeInTheDocument();
  });

  // Test 5: Delete a note
  test("deletes a note", () => {
    const initialNotes = [
      { id: 1, title: "Note to delete", content: "Content to delete", label: Label.other }
    ];

    render(<StickyNotes initialNotes={initialNotes} initialFavorites={[]} onToggleFavorite={jest.fn()} />);

    const deleteButton = screen.getByText("x");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Note to delete")).not.toBeInTheDocument();
  });

  // Test 6: Edge Case - Zero notes
  test("handles zero notes", () => {
    render(<StickyNotes initialNotes={[]} initialFavorites={[]} onToggleFavorite={jest.fn()} />);

    // Expect no notes to be displayed
    const noNotesMessage = screen.queryByText("No notes available"); // Add this if you display a "No notes" message
    expect(noNotesMessage).toBeNull();
  });

  // Test 7: Handle long note title and content
  test("handles long note titles and content", () => {
    const longTitle = "A".repeat(100);
    const longContent = "B".repeat(500);

    render(<StickyNotes initialNotes={[]} initialFavorites={[]} onToggleFavorite={jest.fn()} />);

    const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
    const createNoteContentTextarea = screen.getByPlaceholderText("Note Content");
    const createNoteButton = screen.getByText("Create Note");

    fireEvent.change(createNoteTitleInput, { target: { value: longTitle } });
    fireEvent.change(createNoteContentTextarea, { target: { value: longContent } });
    fireEvent.click(createNoteButton);

    const createdNoteTitle = screen.getByText(longTitle);
    const createdNoteContent = screen.getByText(longContent);

    expect(createdNoteTitle).toBeInTheDocument();
    expect(createdNoteContent).toBeInTheDocument();
  });

  // Test 8: Toggle favorite status
  test("toggles favorite status", () => {
    const initialNotes = [
      { id: 1, title: "Favorite Note", content: "Content", label: Label.other }
    ];

    const toggleFavoriteMock = jest.fn();

    render(<StickyNotes initialNotes={initialNotes} initialFavorites={[]} onToggleFavorite={toggleFavoriteMock} />);

    const favoriteButton = screen.getByText("♥");
    fireEvent.click(favoriteButton);

    expect(toggleFavoriteMock).toHaveBeenCalledWith("Favorite Note");
  });
});
