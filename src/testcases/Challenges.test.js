import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Challenges from '../pages/Challenges/Challenges';

describe('Challenges component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Challenges />
      </MemoryRouter>
    );
  });

  it('renders the search input field', () => {
    render(
      <MemoryRouter>
        <Challenges />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search Challenges')).toBeInTheDocument();
  });

  it('updates the search field state when typed into', () => {
    render(
      <MemoryRouter>
        <Challenges />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Search Challenges'), { target: { value: 'Citadel' } });

    expect(screen.getByPlaceholderText('Search Challenges')).toHaveValue('Citadel');
  });

  it('renders the correct number of challenges', () => {
    render(
      <MemoryRouter>
        <Challenges />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('article')).toHaveLength(9);
  });

  it('displays each challenge with the correct title and number', () => {
    render(
      <MemoryRouter>
        <Challenges />
      </MemoryRouter>
    );

    const challengeTitles = screen.getAllByText(/Challenge \d/).map((title) => title.textContent);
    const challengeNumbers = screen.getAllByText(/Challenge \d/).map((number) => number.textContent);

    expect(challengeTitles).toEqual([
      'The Wave Awaits',
      'Find Fortune at Fortune Donuts',
      'Find Life in Italy at Pier 21',
      'Nothing beats Local Beer',
      'History Deep Dive: Citadel Hill',
      'Lillies at Halifax Public Gardens',
      'Tragedy of Titanic',
      'Bike ride? Sure!',
      'Treat yourself to a glass of wine',
    ]);

    expect(challengeNumbers).toEqual([
      'Challenge 1',
      'Challenge 2',
      'Challenge 3',
      'Challenge 4',
      'Challenge 5',
      'Challenge 6',
      'Challenge 7',
      'Challenge 8',
      'Challenge 9',
    ]);
  });

  it('redirects to the correct challenge page when a challenge is clicked', () => {
    render(
      <MemoryRouter>
        <Challenges />
      </MemoryRouter>
    );

    const challengeLink = screen.getByText('The Wave Awaits').closest('a');
    fireEvent.click(challengeLink);

    expect(window.location.href).toContain('/Halifaxwave');
  });

  it('displays an error message when a challenge route is not found', () => {
    render(
      <MemoryRouter>
        <Challenges />
      </MemoryRouter>
    );

    const toastSpy = jest.spyOn(window, 'toast');

    const challengeLink = screen.getByText('Tragedy of Titanic').closest('a');
    fireEvent.click(challengeLink);

    expect(toastSpy).toHaveBeenCalledWith('No route found for this challenge!');
  });

  it('renders the Footer component', () => {
    render(
      <MemoryRouter>
        <Challenges />
      </MemoryRouter>
    );

    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
});
