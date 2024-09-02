'use client';

import { CodeFun } from '@prisma/client';
import { Space, Table, TableProps } from 'antd';
import Link from 'next/link';

const columns: TableProps<CodeFun>['columns'] = [
  { dataIndex: 'id', title: 'id' },
  {
    dataIndex: 'slug',
    title: 'slug',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/code-fun/${record.slug}`} target="_blank">
          预览
        </Link>
      </Space>
    ),
  },
];

export interface CodeFunTableProps {
  list: CodeFun[];
}

const CodeFunTable = ({ list }: CodeFunTableProps) => {
  return (
    <div className="mt-4">
      <Table columns={columns} dataSource={list} />
    </div>
  );
};

export default CodeFunTable;
