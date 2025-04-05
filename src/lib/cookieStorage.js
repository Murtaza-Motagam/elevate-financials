'use server';
import { cookies } from 'next/headers';
import cookieConfig from './config';

export const getCookie = async (key) => {
    const cookieStore = await cookies();
    const cookieName = cookieStore.get(cookieConfig.cookieName);

    if (!cookieName) return null;

    try {
        const parsedCookie = JSON.parse(decodeURIComponent(cookieName.value));
        return parsedCookie[key];
    } catch (error) {
        console.error('Error parsing cookie:', error);
        return null;
    }
};

export const setCookie = async (key, value, options = {}) => {
    const cookieStore = await cookies();
    const existingCookie = cookieStore.get(cookieConfig.cookieName);
    let cookieName = {};

    if (existingCookie) {
        try {
            cookieName = JSON.parse(decodeURIComponent(existingCookie.value));
        } catch (error) {
            console.error('Error parsing existing cookie:', error);
        }
    }

    cookieName[key] = value;
    const cookieString = encodeURIComponent(JSON.stringify(cookieName));

    cookieStore.set(cookieConfig.cookieName, cookieString, options);
};

export const removeCookie = async (key) => {
    const cookieStore = await cookies();
    const existingCookie = cookieStore.get(cookieConfig.cookieName);

    if (existingCookie) {
        try {
            const cookieName = JSON.parse(decodeURIComponent(existingCookie.value));
            if (cookieName[key] !== undefined) {
                delete cookieName[key];
                cookieStore.set(cookieConfig.cookieName, encodeURIComponent(JSON.stringify(cookieName)), {
                    maxAge: 0,
                }); // Set maxAge to 0 to delete
            }
        } catch (error) {
            console.error('Error parsing cookie for removal:', error);
        }
    }
};

export const clearCookies = async () => {
    const cookieStore = await cookies();
    cookieStore.set(cookieConfig.cookieName, '', { maxAge: 0 }); // Clear the whole cookie
};
