import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ListCities from '../pages/Challenges/Cities';

describe('ListCities', () => {
  test('renders component without crashing', () => {
    render(<ListCities />);
  });

  test('renders search input field', () => {
    render(<ListCities />);
    const searchInput = screen.getByPlaceholderText('Search Cities');
    expect(searchInput).toBeInTheDocument();
  });

  test('updates search input field on typing', () => {
    render(<ListCities />);
    const searchInput = screen.getByPlaceholderText('Search Cities');
    fireEvent.change(searchInput, { target: { value: 'Vancouver' } });
    expect(searchInput.value).toBe('Vancouver');
  });

  test('displays correct number of cities', () => {
    render(<ListCities />);
    const cities = screen.getAllByRole('img');
    expect(cities.length).toBe(6);
  });

  test('displays each city with the correct title and image', () => {
    render(<ListCities />);
    const cities = screen.getAllByRole('img');
    expect(cities[0]).toHaveAttribute('alt', 'profile image');
    expect(cities[0]).toHaveAttribute('src', 'https://imgs.search.brave.com/meEPoASeEQrISPl8OzOSzdWZv-hHHLxpXn1dcXEHaqU/rs:fit:724:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4z/UmN0OEc1bWxURFV0/dGEycTN6cllBSGFF/MiZwaWQ9QXBp');
    expect(cities[0].nextElementSibling.textContent).toBe('Halifax');
  });

  test('redirects to the correct challenge page on clicking a city', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));
    render(<ListCities />);
    const city = screen.getAllByRole('img')[0];
    fireEvent.click(city);
    expect(mockNavigate).toHaveBeenCalledWith('/challenges/1');
  });

  test('displays "More destinations arriving soon..." message at the bottom', () => {
    render(<ListCities />);
    const message = screen.getByText('More destinations arriving soon...');
    expect(message).toBeInTheDocument();
  });

  test('renders Footer component at the bottom', () => {
    render(<ListCities />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });
});
