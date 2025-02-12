import axios, { Method } from 'axios';
import { LocalStorage } from './localStorage';
import { backendUrl } from './constant';

interface ApiRequestArgs {
  url: string;
  method?: Method;
  params?: Record<string, unknown>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  headers?: Record<string, unknown>;
}

const apiRequest = async <T = unknown>({
  url,
  method = 'get',
  params = {},
  data = {},
  headers,
}: ApiRequestArgs): Promise<T> => {
  try {
    const { token } = LocalStorage.get('authDetails');
    const fullUrl = `${backendUrl}${url}`;
    const response = await axios({
      url: fullUrl,
      method,
      headers: {
        Authorization: token ?? '',
        ...headers,
      },
      params,
      data,
    });

    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default apiRequest;
