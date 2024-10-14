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

  test("renders todo list items", () => {
    dummyGroceryList.forEach(item => {
      const listItem = screen.getByText(item.name);
      expect(listItem).toBeInTheDocument();
    });
  });

  test("updates checked items count", async () => {
    const initialCount = screen.getByText(/Items bought: 0/i);
    expect(initialCount).toBeInTheDocument();

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    await waitFor(() => {
      const updatedCount = screen.getByText(/Items bought: 1/i);
      expect(updatedCount).toBeInTheDocument();
    });
  });

  test("number of items checked matches the title", async () => {
    const checkboxes = screen.getAllByRole("checkbox");
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));

    await waitFor(() => {
      const finalCount = screen.getByText(`Items bought: ${checkboxes.length}`);
      expect(finalCount).toBeInTheDocument();
    });
  });

  test("displays all items in the list", () => {
    dummyGroceryList.forEach(item => {
      const listItem = screen.getByText(item.name);
      expect(listItem).toBeInTheDocument();
    });
  });

  test("verifies initial state has 0 items checked", () => {
    const initialCount = screen.getByText(/Items bought: 0/i);
    expect(initialCount).toBeInTheDocument();
  });

  test("checks and unchecks all items", async () => {
    const checkboxes = screen.getAllByRole("checkbox");
    
    // Check all items
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));

    await waitFor(() => {
      const allCheckedCount = screen.getByText(`Items bought: ${checkboxes.length}`);
      expect(allCheckedCount).toBeInTheDocument();
    });

    // Uncheck all items
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));

    await waitFor(() => {
      const noneCheckedCount = screen.getByText('Items bought: 0');
      expect(noneCheckedCount).toBeInTheDocument();
    });
  });

  test("moves checked items to the bottom of the list", async () => {
    const checkboxes = screen.getAllByRole("checkbox");
    const itemNames = dummyGroceryList.map(item => item.name);

    // Check the first item
    fireEvent.click(checkboxes[0]);

    await waitFor(() => {
      const listItems = screen.getAllByText(new RegExp(itemNames.join('|'), 'i'));
      expect(listItems[listItems.length - 1].textContent).toBe(itemNames[0]);
    });

    // Check the second item
    fireEvent.click(checkboxes[1]);

    await waitFor(() => {
      const listItems = screen.getAllByText(new RegExp(itemNames.join('|'), 'i'));
      expect(listItems[listItems.length - 2].textContent).toBe(itemNames[0]);
      expect(listItems[listItems.length - 1].textContent).toBe(itemNames[1]);
    });
  });
});