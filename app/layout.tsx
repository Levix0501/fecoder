import GoogleAnalytics from '@/components/google-analytics';
import Footer from '@/components/layouts/footer';
import { HeaderBar } from '@/components/layouts/header-bar';
import { NprogressBar } from '@/components/nprogress-bar';
import { siteConfig } from '@/site-config';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/globals.css';
import BaiduAnalytics from '@/components/baidu-analytics';
import Head from 'next/head';
import { absoluteUrl } from '@/lib/utils';

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
  keywords: siteConfig.keywords,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: 'website',
    url: absoluteUrl('/'),

    // images: [
    //   {
    //     url: siteConfig.ogImage,
    //     width: 1200,
    //     height: 630,
    //     alt: siteConfig.name,
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,

    // images: [siteConfig.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <BaiduAnalytics />
      </head>
      <body className={inter.className}>
        <HeaderBar />
        {children}
        <Footer />
        <NprogressBar />
      </body>
      <GoogleAnalytics />
    </html>
  );
}
