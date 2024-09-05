'use server';

import { prisma } from '@/prisma';
import { TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';

export const generate = async () => {
  // const articles = await prisma.article.findMany({ take: 100 });
  // for (const article of articles) {
  //   const codeFun = await prisma.codeFun.findUnique({
  //     where: { slug: article.slug.split('/')[2] },
  //   });
  //   if (codeFun) {
  //     await prisma.article.update({
  //       where: { id: article.id },
  //       data: {
  //         createTime: dayjs(codeFun.date).toISOString(),
  //         updateTime: dayjs(codeFun.date).toISOString(),
  //       },
  //     });
  //   }
  // }
  // console.log(await prisma.article.findMany({ take: 100 }));
  // await prisma.author.update({
  //   where: { id: 'cm0n66h0m0002a21dmapg4wwr' },
  //   data: { homepage: '/code-fun' },
  // });
};

export const generateArticleByCodeFun = async (codeFunId: string) => {
  const codeFun = await prisma.codeFun.findUnique({ where: { id: codeFunId } });
  if (!codeFun) return;

  const {
    title,
    desc,
    slug,
    status,
    imageId,
    createTime,
    updateTime,
    authorId,
  } = codeFun;

  const article = await prisma.article.findUnique({
    where: { slug: `/code-fun/${slug}` },
  });
  if (article) return;

  await prisma.article.create({
    data: {
      title,
      desc,
      slug: `/code-fun/${slug}`,
      status,
      imageId,
      createTime,
      updateTime,
      authorId,
    },
  });
};

export const fetchArticles = async ({
  pageSize = 20,
  current = 1,
}: TablePaginationConfig) =>
  Promise.all([
    prisma.article.findMany({
      skip: (current - 1) * pageSize,
      take: pageSize,
      orderBy: { createTime: 'desc' },
    }),
    prisma.article.count(),
  ]);
