import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

test('renders Header component without crashing', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
});

test('renders AppBar component', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const appBarElement = getByRole('banner');
  expect(appBarElement).toBeInTheDocument();
});

test('renders Toolbar component', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const toolbarElement = getByRole('toolbar');
  expect(toolbarElement).toBeInTheDocument();
});

test('renders TravelExploreIcon component', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const travelExploreIconElement = getByRole('img');
  expect(travelExploreIconElement).toBeInTheDocument();
});

test('renders TRAVELQUEST title component with a Link component with the path to "/cities"', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const travelQuestTitleLinkElement = getByRole('link', { name: /travelquest/i });
  expect(travelQuestTitleLinkElement).toHaveAttribute('href', '/cities');
});

test('renders MenuIcon component for mobile view', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const menuIconElement = getByRole('button', { name: /account of current user/i });
  expect(menuIconElement).toBeInTheDocument();
});

test('renders Menu component for mobile view', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const menuElement = getByRole('menu');
  expect(menuElement).toBeInTheDocument();
});

test('renders Home MenuItem component for mobile view', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const homeMenuItemElement = getByText('Home');
  expect(homeMenuItemElement).toBeInTheDocument();
});

test('renders AccountCircleIcon component for desktop view with a Link component with the path to "/profile"', () => {
  const { getByRole } = render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  const accountCircleIconLinkElement = getByRole('link', { name: /open settings/i });
  expect(accountCircleIconLinkElement).toHaveAttribute('href', '/profile');
});
