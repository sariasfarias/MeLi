import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import { Header } from './Header';
import { MemoryRouter } from 'react-router-dom';

const setData = jest.fn();

test('renders Header component with authentication', () => {
  render(
    <MemoryRouter initialEntries={["?search=123"]}>
      <Header isAuth={true}/>
    </MemoryRouter>
  );
  const logoElement = screen.getByAltText('MeLi logo');
  expect(logoElement).toBeInTheDocument();
  const searchBarElement = screen.getByTestId('search-bar');
  expect(searchBarElement).toBeInTheDocument();
});

test('renders Header component without authentication', () => {
  render(<Header isAuth={false} />);
  const logoElement = screen.getByAltText('MeLi logo');
  expect(logoElement).toBeInTheDocument();
  const searchBarElement = screen.queryByTestId('search-bar');
  expect(searchBarElement).not.toBeInTheDocument();
});
