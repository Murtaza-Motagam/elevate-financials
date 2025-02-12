import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { UserProvider } from '@/context/UserContext';

export const metadata: Metadata = {
  title: 'Elevate Financials | Credit Cards, Rewards, Travel, Offers',
  description: 'Welcome to Elevate Financials... | Credit Cards ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
          rel='stylesheet'
        />
      </head>
      <body>
        <ThemeProvider
          attribute='class'
          defaultTheme='light'
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
