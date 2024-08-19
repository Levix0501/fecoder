import GoogleAnalytics from '@/components/google-analytics';
import Footer from '@/components/layouts/footer';
import { HeaderBar } from '@/components/layouts/header-bar';
import { NprogressBar } from '@/components/nprogress-bar';
import { siteConfig } from '@/site-config';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import BaiduAnalytics from '@/components/baidu-analytics';

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
        <HeaderBar />
        {children}
        <Footer />
        <NprogressBar />
      </body>
      <GoogleAnalytics />
      <BaiduAnalytics />
    </html>
  );
}
