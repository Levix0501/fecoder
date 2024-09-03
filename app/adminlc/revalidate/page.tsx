'use client';
import { revalidateCodeFun } from '@/actions/revalidate';
import { Button } from 'antd';

const RevalidatePage = () => {
  return (
    <div>
      <Button onClick={() => revalidateCodeFun()}>revalidate code-fun</Button>
    </div>
  );
};

export default RevalidatePage;
