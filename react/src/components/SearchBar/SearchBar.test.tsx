import { render, screen } from '@testing-library/react';
import { SearchBar } from './SearchBar';

const setData = jest.fn();

describe('SearchBar', () => {
  it('renders the component', () => {
    render(
      <SearchBar setData={setData}/>
    );

    const inputElement = screen.getByPlaceholderText('Nunca dejes de buscar');
    const buttonElement = screen.getByRole('button');

    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it('should call api', () => {
    render(
      <SearchBar setData={setData}/>
    );
    //cal api test
  });
});
