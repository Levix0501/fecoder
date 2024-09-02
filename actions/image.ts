'use server';

import { Bucket, cos, Region } from '@/lib/cos';
import { prisma } from '@/prisma';

export const deleteImage = async (id: string) => {
  const image = await prisma.image.findUnique({ where: { id } });
  if (image) {
    await cos.deleteObject({
      Bucket,
      Region,
      Key: `${image.sign}.${image.suffix}`,
    });
  }
  await prisma.image.delete({ where: { id } });
};
