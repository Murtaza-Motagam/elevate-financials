import axios, { Method } from 'axios';
import { LocalStorage } from './localStorage';

interface ApiRequestArgs {
    url: string;
    method?: Method; 
    params?: Record<string, unknown>;
    data?: Record<string, unknown>;
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
        // Retrieve the Authorization token or any headers from local storage
        const token = LocalStorage.get('authDetails');

        // Make the API request
        const response = await axios({
            url,
            method,
            headers: {
                Authorization: token ? `${token?.authorization}` : '',
                ...headers
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
