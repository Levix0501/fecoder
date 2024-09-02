'use server';
import { serializeOptions } from '@/components/mdx/serialize-options';
import { prisma } from '@/prisma';
import { Prisma } from '@prisma/client';
import { serialize } from 'next-mdx-remote/serialize';

export const decodeMdx = async (content: string) => {
  const source = await serialize(content, serializeOptions);

  // @ts-ignore
  const regex = /```html(.*?)```/s;
  const match = content.match(regex);
  if (match) {
    const html = match[1].trim();
    return { source, html };
  }

  return { source };
};

export const createCodeFun = async (data: Prisma.CodeFunCreateInput) => {
  const codeFun = await prisma.codeFun.findUnique({
    where: { slug: data.slug },
  });

  if (codeFun) {
    throw new Error('slug 已存在！');
  }

  await prisma.codeFun.create({ data });
};
