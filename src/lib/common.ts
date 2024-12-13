import { Slide, toast, ToastOptions } from "react-toastify";
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

export const isAuthenticated = () => {
    return !!Cookies.get('Authorization-token');
};

export const getActiveClass = (route: string, pathname: string, mode: string | undefined) => {
    const isActive = pathname === route;
    const colorClass = mode === 'light' ? 'text-primary' : 'text-white';

    return `font-medium text-sm ${isActive ? colorClass : 'text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white'}`;
};

export const getActiveClassMobile = (route: string, pathname: string, mode: string | undefined) => {
    const isActive = pathname === route;
    const colorClass = mode === 'light' ? 'text-primary' : 'text-white';

    return `py-3 hover:border-2 hover:border-primary font-medium text-sm ${isActive ? colorClass : 'text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white'}`;
};


export const capitalizeFirstLetter = (string: string) =>
    `${string?.charAt(0)?.toUpperCase()}${string?.slice(1)}`;

type ToastType = 'success' | 'info' | 'error' | 'warn';

const toastTypes: Record<ToastType, (message: string, options?: ToastOptions) => void> = {
    success: toast.success,
    info: toast.info,
    error: toast.error,
    warn: toast.warn,
};

export const showToast = (
    message: string,
    type: ToastType = 'success',
    position: ToastOptions['position'] = 'top-right',
    autoClose: number = 3000
) => {
    const toastType = toastTypes[type];

    toastType(message, {
        position: position,
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Slide,
    });
};

export const dateTimeDisplay = (date: Date, locale = 'en', format = 'DD MMM YYYY') => {
    if (date) {
        return dayjs(date).locale(locale).format(format);
    }
};