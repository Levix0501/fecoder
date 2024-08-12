'use client';
import { AppProgressBar } from 'next-nprogress-bar';

export const NprogressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      {children}
      <AppProgressBar color="hsl(var(--primary))" />
    </>
  );
};
