'use client';
import { Button, Upload } from 'antd';
import { UploadCloud } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ImageUploader = () => {
  const onStatusChange = (status?: string) => {
    if (status === 'done') {
      location.replace('/adminlc/assets/image');
    }
  };

  return (
    <Upload
      action="/api/upload/image"
      listType="picture"
      onChange={(e) => onStatusChange(e.file.status)}
    >
      <Button type="primary" icon={<UploadCloud />}>
        Upload
      </Button>
    </Upload>
  );
};

export default ImageUploader;
