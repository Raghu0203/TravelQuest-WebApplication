import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Profile from '../pages/Profile/Profile';

test('renders Profile component', () => {
  render(
    <BrowserRouter>
      <CookiesProvider>
        <Profile />
      </CookiesProvider>
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/Logout/i);
  expect(linkElement).toBeInTheDocument();
});

test('displays user name and email', () => {
  const name = 'John Doe';
  const email = 'johndoe@example.com';
  render(
    <BrowserRouter>
      <CookiesProvider cookies={{ name: name, email: email }}>
        <Profile />
      </CookiesProvider>
    </BrowserRouter>
  );
  expect(screen.getByText(name)).toBeInTheDocument();
  expect(screen.getByText(email)).toBeInTheDocument();
});

test('clicking the "Badges" button navigates to the badges page', () => {
  render(
    <BrowserRouter>
      <CookiesProvider>
        <Profile />
      </CookiesProvider>
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText(/Badges/i));
  expect(screen.getByText(/Your Badges/i)).toBeInTheDocument();
});

test('clicking the "Logout" button deletes the cookies and navigates to the login page', () => {
  const setCookiesMock = jest.fn();
  global.console = { ...global.console, error: jest.fn() }; // Suppressing console error due to deleting cookies during test
  render(
    <BrowserRouter>
      <CookiesProvider cookies={{ name: 'John Doe', email: 'johndoe@example.com' }}>
        <Profile setCookies={setCookiesMock} />
      </CookiesProvider>
    </BrowserRouter>
  );
  fireEvent.click(screen.getByText(/Logout/i));
  expect(setCookiesMock).toHaveBeenCalledTimes(2);
  expect(setCookiesMock).toHaveBeenCalledWith('email', '', { path: '/', maxAge: 0 });
  expect(setCookiesMock).toHaveBeenCalledWith('name', '', { path: '/', maxAge: 0 });
  expect(screen.getByText(/Welcome back!/i)).toBeInTheDocument();
});

test('renders Footer component', () => {
  render(
    <BrowserRouter>
      <CookiesProvider>
        <Profile />
      </CookiesProvider>
    </BrowserRouter>
  );
  const footerElement = screen.getByTestId('footer');
  expect(footerElement).toBeInTheDocument();
});
