import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Halifaxwave from '../pages/Challenges/Halifaxwave';

describe('Halifaxwave component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Halifaxwave />
      </MemoryRouter>
    );
  });

  test('displays the challenge title correctly', () => {
    render(
      <MemoryRouter>
        <Halifaxwave />
      </MemoryRouter>
    );
    expect(screen.getByText('The Wave Awaits')).toBeInTheDocument();
  });

  test('displays the challenge description correctly', () => {
    render(
      <MemoryRouter>
        <Halifaxwave />
      </MemoryRouter>
    );
    expect(screen.getByText('Address: Lower Water St, Halifax NS B3J 1K1')).toBeInTheDocument();
  });

  test('displays the challenge image correctly', () => {
    render(
      <MemoryRouter>
        <Halifaxwave />
      </MemoryRouter>
    );
    expect(screen.getByAltText('profile image')).toBeInTheDocument();
  });

  test('redirects to the correct page when "Find Directions" button is clicked', () => {
    render(
      <MemoryRouter>
        <Halifaxwave />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Find Directions'));
    expect(window.location.href).toBe('http://localhost/map');
  });

  test('redirects to the correct page when "Verify Challenge" button is clicked', () => {
    render(
      <MemoryRouter>
        <Halifaxwave />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Verify Challenge'));
    expect(window.location.href).toBe('http://localhost/upload');
  });

  test('renders the Footer component', () => {
    render(
      <MemoryRouter>
        <Halifaxwave />
      </MemoryRouter>
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
