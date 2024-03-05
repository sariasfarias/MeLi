import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ItemCardList } from './ItemCardList';

describe('ItemCardList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders item card list with correct information', async () => {
    render(
      <MemoryRouter  initialEntries={["?search=123"]}>
        <ItemCardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      const categoriesElement = screen.getByTestId('item-card-categories');
      expect(categoriesElement).toBeInTheDocument();
    });
  });
});
