import { prisma } from '@/prisma';
import { Button } from 'antd';
import Link from 'next/link';
import CodeFunTable from './_components/code-fun-table';

const AdminCodeFunPage = async () => {
  return (
    <div>
      <Link href="/adminlc/code-fun/create">
        <Button>创建</Button>
      </Link>

      <CodeFunTable />
    </div>
  );
};

export default AdminCodeFunPage;
