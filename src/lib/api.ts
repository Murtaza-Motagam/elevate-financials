import axios, { Method } from 'axios';
import { LocalStorage } from './localStorage';
import { backendUrl } from './constant';
import { decryptData, encryptData } from './encryptions';

interface ApiRequestArgs {
  url: string;
  method?: Method;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any;
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
    const encryptedPayload = encryptData(data);
    const response = await axios({
      url: fullUrl,
      method,
      headers: {
        Authorization: token ?? '',
        ...headers,
      },
      params,
      data: { encrypted: encryptedPayload },
    });
    if (response.data.encrypted) {
      const decryptedData = decryptData(response.data.encrypted);
      return JSON.parse(decryptedData);
    }
    return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
  }
};

export default apiRequest;
