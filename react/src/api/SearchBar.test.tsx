import axios from 'axios';
import { getItems } from './SearchBar';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const setData = jest.fn();

describe('getItems function', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should fetch items successfully', async () => {
    const mockData = {
      author: { name: 'John', lastName: 'Doe' },
      categories: ['Category1', 'Category2'],
      items: [
        {
          id: '123',
          title: 'Item 1',
          price: { currency: 'USD', amount: 10, decimals: 50 },
          picture: 'image.jpg',
          condition: 'new',
          freeShipping: true,
        },
      ],
    };

    const mockResponse = { data: mockData, ok: true };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    await getItems('queryParam', setData);

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      params: { q: 'queryParam' },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer null`, 
      },
      withCredentials: false,
    });

    expect(setData).toHaveBeenCalledWith(mockData);
  });

  test('should handle error when fetching items fails', async () => {
    mockedAxios.get.mockRejectedValue(new Error('Error fetching items'));

    await getItems('queryParam', setData);

    expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
      params: { q: 'queryParam' },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer null`,
      },
      withCredentials: false,
    });

    expect(setData).toHaveBeenCalledWith([]);
  });
});


