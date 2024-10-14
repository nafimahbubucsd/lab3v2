import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./toDoList";
import { MemoryRouter, Route, Routes } from "react-router-dom";

describe("ToDoList Component", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/todolist/TestUser"]}>
        <Routes>
          <Route path="/todolist/:name" element={<ToDoList />} />
        </Routes>
      </MemoryRouter>
    );
  });

  test("renders todo list items", () => {
    const appleItem = screen.getByText(/Apples/i);
    const bananaItem = screen.getByText(/Bananas/i);
    expect(appleItem).toBeInTheDocument();
    expect(bananaItem).toBeInTheDocument();
  });

  test("updates checked items count", () => {
    const initialCount = screen.getByText(/Items bought: 0/i);
    expect(initialCount).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    const updatedCount = screen.getByText(/Items bought: 1/i);
    expect(updatedCount).toBeInTheDocument();
  });

  test("number of items checked matches the title", () => {
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));

    const finalCount = screen.getByText(`Items bought: ${checkboxes.length}`);
    expect(finalCount).toBeInTheDocument();
  });
});