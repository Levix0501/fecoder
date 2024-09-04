'use client';

import { generate } from '@/actions/article';
import '@/styles/highlight.css';
import { Button } from 'antd';

const AdminPage = () => {
  return (
    <div>
      <Button onClick={() => generate()}>生成</Button>
    </div>
  );
};

export default AdminPage;
