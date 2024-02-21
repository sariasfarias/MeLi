import { render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('SearchBar', () => {
  it('renders the component', () => {
    render(
      <SearchBar/>
    );

    const inputElement = screen.getByPlaceholderText('Nunca dejes de buscar');
    const buttonElement = screen.getByRole('button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call api', () => {
    render(
      <SearchBar/>
    );
    //cal api test
  });
});
