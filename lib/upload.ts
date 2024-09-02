import { prisma } from '@/prisma';
import { encryptFileMD5 } from './crypto';
import imageSize from 'image-size';
import { join } from 'path';
import { unlinkSync, writeFileSync } from 'fs';
import { Bucket, cos, Region } from './cos';
import dayjs from 'dayjs';

export const uploadImageToCos = async (file: File) => {
  const type = file.type.split('/');
  if (type.length !== 2 || type[0] !== 'image') {
    throw new Error('文件类型获取失败！');
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileMd5 = encryptFileMD5(buffer);

  const result = await prisma.image.findUnique({ where: { sign: fileMd5 } });
  if (result) {
    return result;
  }

  const typeSuffix = `.${type[1]}`;
  const metadata = imageSize(buffer);
  if (!metadata.width || !metadata.height) {
    throw new Error('图片尺寸获取失败！');
  }

  const fileName = `${fileMd5}${typeSuffix}`;
  const tempPath = join(__dirname, fileName);
  writeFileSync(tempPath, buffer);

  const { Location } = await cos.uploadFile({
    Bucket,
    Region,
    Key: fileName,
    FilePath: tempPath,
  });
  const url = `https://${Location}`;

  unlinkSync(tempPath);

  const image = await prisma.image.create({
    data: {
      sign: fileMd5,
      suffix: type[1],
      url,
      width: metadata.width,
      height: metadata.height,
      createTime: dayjs().toISOString(),
      updateTime: dayjs().toISOString(),
    },
  });
  return image;
};
