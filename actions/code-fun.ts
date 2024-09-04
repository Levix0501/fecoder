'use server';
import { serializeOptions } from '@/components/mdx/serialize-options';
import { prisma } from '@/prisma';
import { Prisma } from '@prisma/client';
import { TablePaginationConfig } from 'antd';
import { serialize } from 'next-mdx-remote/serialize';
import { generateArticleByCodeFun } from './article';

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

  const newCodeFun = await prisma.codeFun.create({ data });
  await generateArticleByCodeFun(newCodeFun.id);
};

export const updateCodeFun = async (
  data: Prisma.CodeFunUpdateInput,
  id: string
) => {
  const codeFun = await prisma.codeFun.update({
    data,
    where: { id },
  });
};

export const fetchCodeFuns = async ({
  pageSize = 20,
  current = 1,
}: TablePaginationConfig) =>
  Promise.all([
    prisma.codeFun.findMany({
      skip: (current - 1) * pageSize,
      take: pageSize,
      orderBy: { createTime: 'desc' },
    }),
    prisma.codeFun.count(),
  ]);

export const fetchCodeFunById = async (id: string) =>
  prisma.codeFun.findUnique({ where: { id } });
