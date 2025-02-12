import { Slide, toast, ToastOptions } from 'react-toastify';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import axios from 'axios';
import { backendUrl, KEYS } from './constant';
import { LocalStorage } from './localStorage';

export const isAuthenticated = () => {
  return Cookies.get('Authorization-token');
};

export const getActiveClass = (route: string, pathname: string, mode: string | undefined) => {
  const isActive = pathname === route;
  const colorClass = mode === 'light' ? 'text-primary' : 'text-white';

  return `font-medium text-sm ${isActive ? colorClass : 'text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white'}`;
};

export const getActiveClassMobile = (route: string, pathname: string, mode: string | undefined) => {
  const isActive = pathname === route;
  const colorClass = mode === 'light' ? 'text-primary' : 'text-white';

  return `py-3 hover:border-2 hover:border-primary !bg-transparent font-medium text-sm ${isActive ? colorClass : 'text-gray-700 hover:text-primary dark:text-gray-400 dark:hover:text-white'}`;
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
  autoClose: number = 3000,
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
    theme: 'colored',
    transition: Slide,
  });
};

export const dateTimeDisplay = (date: Date, locale = 'en', format = 'DD MMM YYYY') => {
  if (date) {
    return dayjs(date).locale(locale).format(format);
  }
};

export const formattedPath = (img: string) => {
  return img.replace(/\\/g, '/');
};

export const copyToClipboard = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

export const getActiveClassSidebar = (selectedTab: number | undefined, linkIndex: number) => {
  const isActive = selectedTab === linkIndex;
  const colorClass = 'bg-primary text-white';

  return isActive ? colorClass : '';
};

export const getUserInfo = async () => {
  const checkForModule = LocalStorage.getJSON('authDetails');
  try {
    const response = await axios({
      url: `${backendUrl}/user/get-user`,
      method: 'get',
      headers: {
        Authorization: checkForModule?.token,
      },
    });
    const resData = response.data;
    return resData;
  } catch (error) {
    console.error(error);
  }
};

export const formatWithCommas = (number: number) => {
  if (typeof number !== 'number') return number;
  return number.toLocaleString('en-IN');
};

export const logout = async () => {
  Cookies.remove('Authorization-token');
  await axios.delete('/api/user');
  LocalStorage.remove(KEYS.authDetails);
  showToast('You have successfully logged out. See you again soon!');
  setTimeout(() => {
    window.open('http://localhost:3000/login', '_self');
  }, 600);
};