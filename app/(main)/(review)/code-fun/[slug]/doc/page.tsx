'use client';

import { permanentRedirect, usePathname } from 'next/navigation';

const CodeFunDetailDocPage = () => {
  const pathname = usePathname();
  permanentRedirect(pathname.replace('/doc', ''));
};

export default CodeFunDetailDocPage;
