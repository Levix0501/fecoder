import { prisma } from '@/prisma';
import { Button, Image, Upload } from 'antd';
import { UploadCloud } from 'lucide-react';
import { z } from 'zod';
import ImageItem from './_components/image-item';
import ImageUploader from './_components/image-uploader';

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
  });

  return (
    <div className="mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {list.map((e) => (
        <ImageItem key={e.id} {...e} />
      ))}
    </div>
  );
};

export default ImageGalleryPage;
