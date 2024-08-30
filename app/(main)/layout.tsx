import Footer from '@/components/layouts/footer';
import { HeaderBar } from '@/components/layouts/header-bar';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderBar />
      {children}
      <Footer />
    </>
  );
}
