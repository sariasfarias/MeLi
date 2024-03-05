import axios from 'axios';

import { getAuthorizationHeader, getItemsURL } from './constants';
import { getItem } from './Item';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getItem function', () => {
  beforeEach(() => { jest.clearAllMocks();
  });

  test('fetches item data successfully', async () => {
    const itemId = '123';
    const mockData = { id: itemId, title: 'Sample Item' };
    const response = { statusText: 'OK', data: mockData };
    mockedAxios.get.mockResolvedValue(response);

    const setData = jest.fn();
    await getItem(itemId, setData);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${getItemsURL}/${itemId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthorizationHeader(),
      },
      withCredentials: false,
    });
    expect(setData).toHaveBeenCalled();
  });

  test('handles error when fetching item data fails', async () => {
    const itemId = '123';
    mockedAxios.get.mockRejectedValue(new Error('Error fetching item data'));

    const setData = jest.fn();
    await getItem(itemId, setData);

    expect(mockedAxios.get).toHaveBeenCalledWith(`${getItemsURL}/${itemId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthorizationHeader(),
      },
      withCredentials: false,
    });
    expect(setData).toHaveBeenCalledWith([]);
  });
});
