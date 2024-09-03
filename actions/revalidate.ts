'use server';

import { revalidatePath } from 'next/cache';

export const revalidateCodeFun = () => {
  revalidatePath('/code-fun');
};

export const revalidate = (path: string) => {
  revalidatePath(path);
};
