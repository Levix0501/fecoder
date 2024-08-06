import { ReactNode } from 'react';
import CodeFunBreadcrumb from './breadcrumb';
import Navigation from './navigation';

const DetailLayout = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  return (
    <>
      <CodeFunBreadcrumb title={title} />
      <Navigation />
      {children}
    </>
  );
};

export default DetailLayout;
