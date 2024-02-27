import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { SignIn } from './SignIn';

test('renders SignIn component', () => {
  render(<SignIn />);
  const headingElement = screen.getByText('Registro');
  expect(headingElement).toBeInTheDocument();

  const nameInputElement = screen.getByPlaceholderText('Juan');
  expect(nameInputElement).toBeInTheDocument();

  const lastNameInputElement = screen.getByPlaceholderText('Paredes');
  expect(lastNameInputElement).toBeInTheDocument();

  const emailInputElement = screen.getByPlaceholderText('juan.paredes@mail.com');
  expect(emailInputElement).toBeInTheDocument();

  const passwordInputElement = screen.getByPlaceholderText('12345678');
  expect(passwordInputElement).toBeInTheDocument();
});
