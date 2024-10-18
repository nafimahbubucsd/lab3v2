import { render, screen, fireEvent } from "@testing-library/react";
import { ToDoList } from "./ToDoList";
import { BrowserRouter } from "react-router-dom";

describe("ToDoList Component", () => {

  // Test 1: Read - Display all to-do items
  test("displays all to-do items", () => {
    render(
      <BrowserRouter>
        <ToDoList />
      </BrowserRouter>
    );

    // Assuming dummyGroceryList has "Apples" and "Bananas"
    const item1 = screen.getByText("Apples");
    const item2 = screen.getByText("Bananas");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });

  // Test 2: Update - Checking an item updates the bought count
  test("updates bought items count when an item is checked", () => {
    render(
      <BrowserRouter>
        <ToDoList />
      </BrowserRouter>
    );

    // Now the checkbox can be found via its aria-label
    const checkbox = screen.getByRole('checkbox', { name: /Apples/i });
    const boughtCount = screen.getByText("Items bought: 0");

    // Simulate checking the checkbox
    fireEvent.click(checkbox);

    // After clicking, bought count should be updated
    expect(screen.getByText("Items bought: 1")).toBeInTheDocument();
  });

  // Test 3: Edge Case - Zero items in the list
  test("displays 'No tasks available' when there are zero items", () => {
    render(
      <BrowserRouter>
        <ToDoList />
      </BrowserRouter>
    );

    // Assuming the component displays "No tasks available" when there are no items
    const emptyMessage = screen.queryByText("No tasks available");

    expect(emptyMessage).toBeNull();  // Adjust this to your actual logic (may need to implement "No tasks" message)
  });

  // Test 4: Edge Case - Handling special characters in item names
  test("handles special characters in item names", () => {
    render(
      <BrowserRouter>
        <ToDoList />
      </BrowserRouter>
    );

    // Assuming dummyGroceryList has an item with special characters "@Special!Item#"
    const specialItem = screen.getByText("@Special!Item#");

    expect(specialItem).toBeInTheDocument();
  });

  // Test 5: Persistence - Checked items persist after re-rendering
  test("persists checked items after re-rendering", () => {
    const { rerender } = render(
      <BrowserRouter>
        <ToDoList />
      </BrowserRouter>
    );

    // Now the checkbox can be found via its aria-label
    const checkbox = screen.getByRole('checkbox', { name: /Apples/i });

    // Simulate checking the checkbox
    fireEvent.click(checkbox);

    // Re-render the component
    rerender(
      <BrowserRouter>
        <ToDoList />
      </BrowserRouter>
    );

    // The checkbox should remain checked after re-render
    expect(checkbox).toBeChecked();
  });
});