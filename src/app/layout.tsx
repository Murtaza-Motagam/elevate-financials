import type { Metadata } from 'next';
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { UserProvider } from '@/context/UserContext';
import PreloaderWrapper from '@/components/common/PreloaderWrapper';

export const metadata: Metadata = {
  title: 'Elevate Financials | Secure Banking, Credit Cards, Loans & Rewards',
  description:
    'Elevate Financials offers secure online banking, credit cards, personal and business loans, investment solutions, and exclusive rewards. Manage your finances with ease.',
  keywords: [
    'banking services',
    'online banking',
    'credit cards',
    'personal loans',
    'business banking',
    'investment solutions',
    'financial services',
    'secure banking',
    'mobile banking',
    'mortgage loans',
  ],
  openGraph: {
    title: 'Elevate Financials | Secure Banking & Financial Solutions',
    description:
      'Discover Elevate Financials: secure banking solutions, credit cards, loans, and exclusive rewards. Manage your finances with confidence.',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    type: 'website',
    images: [
      {
        url: '/images/logo.png',
        width: 1200,
        height: 630,
        alt: 'Elevate Financials - Secure Banking & Financial Solutions',
      },
    ],
  },
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
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <PreloaderWrapper>
            <UserProvider>{children}</UserProvider>
          </PreloaderWrapper>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
