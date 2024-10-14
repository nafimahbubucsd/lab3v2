import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ToDoList } from './toDoList';

// Mock localStorage
const localStorageMock = (function() {
  let store: { [key: string]: string } = {};
  return {
    getItem: function(key: string) {
      return store[key] || null;
    },
    setItem: function(key: string, value: string) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('ToDoList Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderWithRouter = (name: string) => {
    return render(
      <MemoryRouter initialEntries={[`/todolist/${name}`]}>
        <Routes>
          <Route path="/todolist/:name" element={<ToDoList />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders todo list items', () => {
    renderWithRouter('TestUser');
    const appleItem = screen.getByText(/Apples/i);
    const bananaItem = screen.getByText(/Bananas/i);
    expect(appleItem).toBeInTheDocument();
    expect(bananaItem).toBeInTheDocument();
  });

  test('updates checked items count', () => {
    renderWithRouter('TestUser');
    const initialCount = screen.getByText(/Items bought: 0/i);
    expect(initialCount).toBeInTheDocument();

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    const updatedCount = screen.getByText(/Items bought: 1/i);
    expect(updatedCount).toBeInTheDocument();
  });

  test('displays correct list name from URL parameter', () => {
    renderWithRouter('TestUser');
    const listTitle = screen.getByText(/TestUser's To Do List/i);
    expect(listTitle).toBeInTheDocument();
  });

  test('maintains separate states for different lists', () => {
    // Render ABC list
    const { unmount } = renderWithRouter('ABC');
    const abcCheckboxes = screen.getAllByRole('checkbox');
    fireEvent.click(abcCheckboxes[0]);
    expect(screen.getByText(/Items bought: 1/i)).toBeInTheDocument();
    unmount();

    // Render DEF list
    renderWithRouter('DEF');
    expect(screen.getByText(/Items bought: 0/i)).toBeInTheDocument();
  });

  // Edge case: Check all items
  test('checks all items', () => {
    renderWithRouter('TestUser');
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));

    const finalCount = screen.getByText(`Items bought: ${checkboxes.length}`);
    expect(finalCount).toBeInTheDocument();
  });

  // Edge case: Uncheck all items
  test('unchecks all items', () => {
    renderWithRouter('TestUser');
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));
    checkboxes.forEach(checkbox => fireEvent.click(checkbox));

    const finalCount = screen.getByText('Items bought: 0');
    expect(finalCount).toBeInTheDocument();
  });
});