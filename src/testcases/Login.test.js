import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Login from '../pages/UserMangement/Login';

jest.mock('aws-sdk', () => ({
  config: { update: jest.fn() },
  DynamoDB: jest.fn().mockImplementation(() => mockDynamoDB),
}));

describe('Login', () => {
  test('renders without crashing', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  test('renders email and password fields in form', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('displays validation errors for empty or invalid fields', async () => {
    const validationSchema = Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
      password: Yup.string().required('Password is required'),
    });
    render(
      <BrowserRouter>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={validationSchema}
          onSubmit={() => {}}
        >
          {() => (
            <form>
              <Login />
              <button type="submit">Submit</button>
            </form>
          )}
        </Formik>
      </BrowserRouter>
    );
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    const emailError = await screen.findByText('Email address is required');
    const passwordError = await screen.findByText('Password is required');
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  test('sets cookies and navigates to cities page on successful login', async () => {
    const navigate = jest.fn();
    const formValues = { email: 'test@example.com', password: 'password' };
    const getItem = jest.fn((params, callback) => {
      const data = { Item: { email: { S: formValues.email }, password: { S: formValues.password } } };
      callback(null, data);
    });
    mockDynamoDB = { getItem };
    render(
      <BrowserRouter>
        <Login navigate={navigate} />
      </BrowserRouter>
    );
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.change(emailInput, { target: { value: formValues.email } });
    fireEvent.change(passwordInput, { target: { value: formValues.password } });
    fireEvent.click(submitButton);
    expect(getItem).toHaveBeenCalledWith(
      { TableName: 'TravelQuest_UserTable', Key: { email: { S: formValues.email } } },
      expect.any(Function)
    );
    expect(document.cookie).toContain(`email=${formValues.email}`);
    expect(document.cookie).toContain('name=');
    expect(navigate).toHaveBeenCalledWith('/cities');
  });

  test('navigates to sign up page on clicking "Sign Up" link', () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    render(
    <BrowserRouter>
    <Login history={historyMock} />
    </BrowserRouter>
    );
    
    const signUpLink = screen.getByText('Sign Up');
    fireEvent.click(signUpLink);
    expect(historyMock.push).toHaveBeenCalledWith('/');
    });
    
    test('sets cookies and navigates to cities page on successful login', async () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    mockDynamoDB.getItem.mockImplementationOnce((params, callback) => {
    const data = {
    Item: {
    email: { S: 'test@example.com' },
    password: { S: 'testpassword' },
    name: { S: 'Test User' },
    },
    };
    callback(null, data);
    });
    render(
    <BrowserRouter>
    <Login history={historyMock} />
    </BrowserRouter>
    );
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
    fireEvent.click(submitButton);
    });
    
    expect(mockDynamoDB.getItem).toHaveBeenCalledTimes(1);
    expect(mockDynamoDB.getItem).toHaveBeenCalledWith(
    {
    TableName: 'TravelQuest_UserTable',
    Key: {
    email: { S: 'test@example.com' },
    },
    },
    expect.any(Function)
    );
    
    expect(document.cookie).toEqual('name=Test User; email=test@example.com');
    expect(historyMock.push).toHaveBeenCalledWith('/cities');
    });
    
    test('displays validation errors if fields are empty or invalid', async () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    render(
    <BrowserRouter>
    <Login history={historyMock} />
    </BrowserRouter>
    );
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    
    await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'invalidemail' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.blur(passwordInput);
    fireEvent.click(submitButton);
    });
    
    expect(mockDynamoDB.getItem).toHaveBeenCalledTimes(0);
    
    expect(screen.getByText('Invalid email address')).toBeInTheDocument();
    expect(screen.getByText('Password is required')).toBeInTheDocument();
    });
    
    test('renders Footer component at the bottom of the page', () => {
    const historyMock = { push: jest.fn(), location: {}, listen: jest.fn() };
    render(
    <BrowserRouter>
    <Login history={historyMock} />
    </BrowserRouter>
    );
    
    const footerElement = screen.getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
    });
});
