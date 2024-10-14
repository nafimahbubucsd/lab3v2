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

  test("displays all items in the list", () => {
    dummyGroceryList.forEach(item => {
      const listItem = screen.getByText(item.name);
      expect(listItem).toBeInTheDocument();
    });
  });
});