import MainAsideLayout from '@/components/layouts/main-aside-layout';
import { Waline } from '@/components/waline/waline';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MainAsideLayout>
      {children}
      <Waline />
    </MainAsideLayout>
  );
}
