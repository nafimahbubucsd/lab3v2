import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToDoList } from './toDoList';

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
    const appleItem = screen.getByText(/Apples/i);
    const bananaItem = screen.getByText(/Bananas/i);
    expect(appleItem).toBeInTheDocument();
    expect(bananaItem).toBeInTheDocument();
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
});