import { AntdRegistry } from '@ant-design/nextjs-registry';
import { PageTransitionProvider } from './_components/page-transition-provider';
import { SideMenu } from './_components/side-menu';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AntdRegistry>
      <div className="h-[50px] w-full fixed bg-background z-20 border-b border-border"></div>
      <aside className="h-screen bg-background fixed z-30 border-r border-border">
        <SideMenu />
      </aside>
      <div className="pl-[256px] pt-[50px] h-full">
        <PageTransitionProvider>
          <main className="h-full p-6 space-y-5">{children}</main>
        </PageTransitionProvider>
      </div>
    </AntdRegistry>
  );
}
