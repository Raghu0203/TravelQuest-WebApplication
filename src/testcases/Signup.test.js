import { render, fireEvent } from '@testing-library/react';
import Signup from '../pages/UserMangement/Signup';

test('shows errors when form fields are invalid', async () => {
  const { getByText, getByLabelText } = render(<Signup />);
  const nameInput = getByLabelText('Name');
  const emailInput = getByLabelText('Email');
  const passwordInput = getByLabelText('Password');
  const securityQuestionInput = getByLabelText('Select');
  const answerInput = getByLabelText('Answer');
  const submitButton = getByText('Sign Up');

  // Submit the form without entering any data
  fireEvent.click(submitButton);

  // Expect error messages to be displayed
  expect(getByText('First name is required')).toBeInTheDocument();
  expect(getByText('Email is required')).toBeInTheDocument();
  expect(getByText('Password is required')).toBeInTheDocument();
  expect(getByText('Please select a question')).toBeInTheDocument();
  expect(getByText('Answer is required')).toBeInTheDocument();

  // Enter invalid data in the form
  fireEvent.change(nameInput, { target: { value: 'a' } });
  fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });
  fireEvent.change(securityQuestionInput, { target: { value: 'null' } });
  fireEvent.change(answerInput, { target: { value: '' } });

  // Submit the form again
  fireEvent.click(submitButton);

  // Expect error messages to be displayed
  expect(getByText('First name must be at least 2 characters')).toBeInTheDocument();
  expect(getByText('Invalid Email')).toBeInTheDocument();
  expect(getByText('Password length should be 8 chars minimum')).toBeInTheDocument();
  expect(getByText('Password should contains at least one uppercase letter, one lowercase letter, one number and special character')).toBeInTheDocument();
  expect(getByText('Please select a question')).toBeInTheDocument();
  expect(getByText('Answer is required')).toBeInTheDocument();
});
