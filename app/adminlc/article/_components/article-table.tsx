'use client';

import { fetchArticles } from '@/actions/article';
import { Article, CodeFun } from '@prisma/client';
import { Space, Table, TablePaginationConfig, TableProps } from 'antd';
import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

const columns: TableProps<Article>['columns'] = [
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
        <Link href={record.slug} target="_blank">
          预览
        </Link>
      </Space>
    ),
  },
];

export interface ArticleTableProps {}

const ArticleTable = () => {
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    pageSize: 20,
    current: 1,
  });
  const { isLoading, data } = useSWR(
    [pagination.pageSize, pagination.current],
    () => fetchArticles(pagination),
    {
      onSuccess(data, key, config) {
        console.log(data);
        if (data) {
          setPagination({ ...pagination, total: data[1] });
        }
      },
    }
  );

  return (
    <div className="mt-4">
      <Table
        rowKey="id"
        loading={isLoading}
        columns={columns}
        pagination={pagination}
        dataSource={data ? data[0] : []}
        onChange={(e) => setPagination(e)}
      />
    </div>
  );
};

export default ArticleTable;
