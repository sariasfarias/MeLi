import { render, screen } from '@testing-library/react';
import { ItemCard } from './ItemCard';

describe('ItemCard component', () => {
  test('renders item card with correct information', () => {
    const item = {
      id: '1',
      title: 'Sample Item',
      price: { currency: 'ARS', amount: 10000, decimals: 50 },
      picture: 'item.jpg',
      condition: 'new',
      free_shipping: true,
    };

    render(<ItemCard freeShipping={true} {...item} />);

    const pictureElement = screen.getByAltText('Sample Item');
    expect(pictureElement).toBeInTheDocument();

    const priceElement = screen.getByText('$ 10000,50');
    expect(priceElement).toBeInTheDocument();

    const titleElement = screen.getByText('Sample Item');
    expect(titleElement).toBeInTheDocument();

    const freeShippingElements = screen.getAllByText('Envío gratis');
    expect(freeShippingElements[0]).toBeInTheDocument();
    expect(freeShippingElements[1]).toBeInTheDocument();
  });
});
