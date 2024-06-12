import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import '../styles/colors.css';
import GoogleAnalytics from '@/components/google-analytics';
import { siteConfig } from '@/site-config';
import { NprogressProvider } from '@/components/providers/nprogress-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/logo.svg',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/logo-dark.svg',
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
    <html lang="en">
      <body className={inter.className}>
        <NprogressProvider>{children}</NprogressProvider>
      </body>
      <GoogleAnalytics />
    </html>
  );
}
