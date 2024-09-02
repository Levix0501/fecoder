import { prisma } from '@/prisma';
import { CodeFun, Prisma } from '@prisma/client';
import { Button, Space, Table, TableProps } from 'antd';
import Link from 'next/link';
import { z } from 'zod';
import CodeFunTable from './_components/code-fun-table';

const AdminCodeFunPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; size?: string };
}) => {
  const parsedSearchParams = z
    .object({
      page: z.preprocess(
        (val) => (isNaN(Number(val)) ? 1 : Number(val)),
        z.number().min(1)
      ),
      size: z.preprocess(
        (val) => (isNaN(Number(val)) ? 20 : Number(val)),
        z.number().min(1)
      ),
    })
    .safeParse(searchParams);
  if (parsedSearchParams.error) {
    return <div>Error</div>;
  }

  const { page, size } = parsedSearchParams.data;
  const list = await prisma.codeFun.findMany({
    skip: (page - 1) * size,
    take: size,
    orderBy: { createTime: 'desc' },
  });

  return (
    <div>
      <Link href="/adminlc/code-fun/create">
        <Button>创建</Button>
      </Link>

      <CodeFunTable list={list} />
    </div>
  );
};

export default AdminCodeFunPage;
