import { ReactNode } from 'react';
import CodeFunBreadcrumb from './breadcrumb';
import Navigation from './navigation';

const DetailLayout = ({
  children,
  title,
  path,
}: {
  children: ReactNode;
  title: string;
  path: string;
}) => {
  return (
    <>
      <CodeFunBreadcrumb title={title} />
      <Navigation />
      {children}
      {/* <Waline path={path} /> */}
    </>
  );
};

export default DetailLayout;
