import { ReactNode } from 'react';
import Navigation from '../_components/navigation';

const CodeFunLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
};

export default CodeFunLayout;
