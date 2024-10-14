import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders Triton Notes title', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/Triton Notes/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const homeLink = screen.getByText(/Home/i);
  const abcToDoListLink = screen.getByText(/ABC To Do List/i);
  const defToDoListLink = screen.getByText(/DEF To Do List/i);
  expect(homeLink).toBeInTheDocument();
  expect(abcToDoListLink).toBeInTheDocument();
  expect(defToDoListLink).toBeInTheDocument();
});

// This test checks if the theme toggle button is present
test('renders theme toggle button', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const toggleThemeButton = screen.getByText(/Toggle Theme/i);
  expect(toggleThemeButton).toBeInTheDocument();
});