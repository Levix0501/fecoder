'use client';

import { deleteImage } from '@/actions/image';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Image } from 'antd';
import { usePathname } from 'next/navigation';
import { useCopyToClipboard } from 'usehooks-ts';

export interface ImageItemProps {
  id: string;
  url: string;
}

const ImageItem = ({ id, url }: ImageItemProps) => {
  const pathname = usePathname();
  const [copiedValue, copyFn] = useCopyToClipboard();

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Image src={url} alt="" />
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => {
            copyFn(id);
          }}
        >
          复制 id
        </ContextMenuItem>
        <ContextMenuItem
          onClick={async () => {
            await deleteImage(id);
            location.replace(pathname);
          }}
        >
          删除
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ImageItem;
