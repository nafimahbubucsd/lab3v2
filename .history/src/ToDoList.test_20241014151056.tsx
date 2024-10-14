import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToDoList } from './toDoList';
import { dummyGroceryList } from './constants';

describe("ToDoList Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDoList />} />
        </Routes>
      </BrowserRouter>
    );
  });

  // ... existing tests ...

  test("number of items checked is the same as shown in the title", async () => {
    const checkboxes = screen.getAllByRole("checkbox");
    
    // Check all items
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));

    await waitFor(() => {
      const titleCount = screen.getByText(`Items bought: ${checkboxes.length}`);
      expect(titleCount).toBeInTheDocument();

      const checkedBoxes = screen.getAllByRole("checkbox", { checked: true });
      expect(checkedBoxes.length).toBe(checkboxes.length);
    });

    // Uncheck one item
    fireEvent.click(checkboxes[0]);

    await waitFor(() => {
      const titleCount = screen.getByText(`Items bought: ${checkboxes.length - 1}`);
      expect(titleCount).toBeInTheDocument();

      const checkedBoxes = screen.getAllByRole("checkbox", { checked: true });
      expect(checkedBoxes.length).toBe(checkboxes.length - 1);
    });
  });

  // ... other tests ...
});