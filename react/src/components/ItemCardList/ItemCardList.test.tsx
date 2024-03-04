import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ItemCardList } from './ItemCardList';

const mockData = {
    author: { name: 'John', lastName: 'Doe' },
    categories: ['Category1', 'Category2'],
    items: [
      {
        id: '1',
        title: 'Sample Item 1',
        price: { currency: 'ARS', amount: 10, decimals: 50 },
        picture: 'item1.jpg',
        condition: 'New',
        free_shipping: true,
      },
      {
        id: '2',
        title: 'Sample Item 2',
        price: { currency: 'ARS', amount: 20, decimals: 75 },
        picture: 'item2.jpg',
        condition: 'Used',
        free_shipping: false,
      },
    ],
  };

jest.mock('../../api/SearchBar', () => ({
    getItems: jest.fn().mockReturnValue(mockData),
}));

describe('ItemCardList component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders item card list with correct information', async () => {

    render(
      <MemoryRouter>
        <ItemCardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      const categoriesElement = screen.getByText('Category1   >   Category2');
      expect(categoriesElement).toBeInTheDocument();

      const item1TitleElement = screen.getByText('Sample Item 1');
      expect(item1TitleElement).toBeInTheDocument();

      const item2TitleElement = screen.getByText('Sample Item 2');
      expect(item2TitleElement).toBeInTheDocument();

      const item1PriceElement = screen.getByText('$ 10,50');
      expect(item1PriceElement).toBeInTheDocument();

      const item2PriceElement = screen.getByText('$ 20,75');
      expect(item2PriceElement).toBeInTheDocument();

      const item1FreeShippingElement = screen.getByText('Envío gratis');
      expect(item1FreeShippingElement).toBeInTheDocument();

      const item2FreeShippingElement = screen.queryByText('Envío gratis');
      expect(item2FreeShippingElement).not.toBeInTheDocument();
    });
  });
});
