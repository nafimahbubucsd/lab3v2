import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route, Routes, MemoryRouter } from 'react-router-dom';
import { ToDoList } from './toDoList';

describe('ToDoList Component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ToDoList />} />
        </Routes>
      </BrowserRouter>
    );
  });

  test('renders todo list items', () => {
    const appleItem = screen.getByText(/Apples/i);
    const bananaItem = screen.getByText(/Bananas/i);
    expect(appleItem).toBeInTheDocument();
    expect(bananaItem).toBeInTheDocument();
  });

  test('updates checked items count', () => {
    const initialCount = screen.getByText(/Items bought: 0/i);
    expect(initialCount).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    const updatedCount = screen.getByText(/Items bought: 1/i);
    expect(updatedCount).toBeInTheDocument();
  });

  test('displays correct list name from URL parameter', () => {
    render(
      <MemoryRouter initialEntries={['/todolist/TestUser']}>
        <Routes>
          <Route path="/todolist/:name" element={<ToDoList />} />
        </Routes>
      </MemoryRouter>
    );

    const listTitle = screen.getByText(/TestUser's To Do List/i);
    expect(listTitle).toBeInTheDocument();
  });

  // Edge case: Check all items
  test('checks all items', () => {
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));

    const finalCount = screen.getByText(`Items bought: ${checkboxes.length}`);
    expect(finalCount).toBeInTheDocument();
  });

  // Edge case: Uncheck all items
  test('unchecks all items', () => {
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));

    const finalCount = screen.getByText('Items bought: 0');
    expect(finalCount).toBeInTheDocument();
  });
});