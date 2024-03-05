import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter} from 'react-router-dom';
import { ItemDetail } from './ItemDetail';


describe('ItemDetail component', () => {
  test('renders item detail with correct information', async () => {
    render(
      <MemoryRouter initialEntries={["/items/123"]}>
        <ItemDetail/>
      </MemoryRouter>
    );

    await waitFor(() => {
      const pictureElement = screen.getByTestId("item-detail-picture");
      expect(pictureElement).toBeInTheDocument();

      const descriptionBox = screen.getByTestId("item-detail-description");
      expect(descriptionBox).toBeInTheDocument();

      const titleElement = screen.getByTestId("item-detail-title");
      expect(titleElement).toBeInTheDocument();

      const priceElement = screen.getByTestId("item-detail-price");
      expect(priceElement).toBeInTheDocument();

      const buttonElement = screen.getByText('Comprar');
      expect(buttonElement).toBeInTheDocument();
    });
  });
})
