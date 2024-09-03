'use server';

import { revalidatePath } from 'next/cache';

export const revalidateCodeFun = () => {
  revalidatePath('/code-fun');
};
