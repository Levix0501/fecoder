import { prisma } from '@/prisma';
import { Button, Upload } from 'antd';
import { UploadCloud } from 'lucide-react';
import { z } from 'zod';

const ImageGalleryPage = async ({
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
  const list = await prisma.image.findMany({
    skip: (page - 1) * size,
    take: size,
    orderBy: { id: 'desc' },
  });
  return (
    <div>
      <Upload
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        listType="picture"
        defaultFileList={[]}
      >
        <Button type="primary" icon={<UploadCloud />}>
          Upload
        </Button>
      </Upload>
    </div>
  );
};

export default ImageGalleryPage;
