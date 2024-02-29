import { registerNewUser } from './User';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('registerNewUser function', () => {
  test('should register new user successfully', async () => {
    const user = { 
        name: 'testuser', 
        lastName: 'lastname',
        email: 'example@mail.com', 
        password: 'testpassword', 
    };
    const setError = jest.fn();
    const mockResponse = { data: { access: 'access_token', refresh: 'refresh_token' }, status: 201 };
    mockedAxios.post.mockResolvedValueOnce(mockResponse);

    await registerNewUser(user, setError);

    expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: false,
    });
    expect(setError).not.toHaveBeenCalled();
  });

  test('should handle error when registration fails', async () => {
    const user = { 
        name: 'testuser', 
        lastName: 'lastname',
        email: 'example@mail.com', 
        password: 'testpassword', 
    };
    const setError = jest.fn();
    mockedAxios.post.mockRejectedValueOnce(new Error('Registration failed'));

    await registerNewUser(user, setError);

    expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: false,
    });
    expect(setError).toHaveBeenCalledWith(true);
  });
});
