import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Home } from './Home';

describe('Home component', () => {
  test('renders Home component with LogIn component when user is not authenticated', () => {
    const mockIsAuth = false;
    render(<Home isAuth={mockIsAuth} />);
    const title = screen.getByText('Usuario no encontrado');
    expect(title).toBeInTheDocument();
    
    const logInComponent = screen.getByTestId('log-in');
    expect(logInComponent).toBeInTheDocument();
  });

  test('does not render LogIn component when user is authenticated', () => {
    const mockIsAuth = true;
    render(<Home isAuth={mockIsAuth} />);
    const title = screen.queryByText('Usuario no encontrado');
    expect(title).not.toBeInTheDocument();
    
    const logInComponent = screen.queryByTestId('log-in');
    expect(logInComponent).not.toBeInTheDocument();
  });
});
