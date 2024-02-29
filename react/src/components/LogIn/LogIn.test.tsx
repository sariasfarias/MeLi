import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { LogIn } from './LogIn';

test('renders LogIn component', () => {
  render(<LogIn />);
  const headingElement = screen.getByText('Ingreso');
  expect(headingElement).toBeInTheDocument();

  const emailInputElement = screen.getByPlaceholderText('juan.paredes@mail.com');
  expect(emailInputElement).toBeInTheDocument();

  const passwordInputElement = screen.getByPlaceholderText('12345678');
  expect(passwordInputElement).toBeInTheDocument();
});
