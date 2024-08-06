import { ReactNode } from 'react';

const CodeFunLayout = ({ children }: { children: ReactNode }) => {
  return <main className="container py-6 lg:py-8">{children}</main>;
};

export default CodeFunLayout;
