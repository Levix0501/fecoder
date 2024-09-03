'use client';
import { revalidate, revalidateCodeFun } from '@/actions/revalidate';
import { Button, Input } from 'antd';
import { useState } from 'react';

const RevalidatePage = () => {
  const [path, setPath] = useState('');
  return (
    <>
      <div>
        <Button onClick={() => revalidateCodeFun()}>revalidate code-fun</Button>
      </div>
      <div>
        <Input value={path} onChange={(e) => setPath(e.currentTarget.value)} />
        <Button onClick={() => revalidate(path)}>revalidate</Button>
      </div>
    </>
  );
};

export default RevalidatePage;
