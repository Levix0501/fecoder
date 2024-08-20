'use client';

import { EllipsisVertical, Gift } from 'lucide-react';
import { RiWechatLine } from 'react-icons/ri';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent } from './ui/dialog';
import { useState } from 'react';
import Image from 'next/image';

export function MoreMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState<'wechat' | 'support'>('wechat');

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 focus-visible:ring-transparent"
          >
            <EllipsisVertical size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={() => {
                setType('wechat');
                setIsOpen(true);
              }}
            >
              <RiWechatLine className="mr-2 h-4 w-4" />
              <span>微信公众号</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setType('support');
                setIsOpen(true);
              }}
            >
              <Gift className="mr-2 h-4 w-4" />
              <span>赞助本站</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog onOpenChange={(e) => setIsOpen(e)} open={isOpen}>
        <DialogContent className="focus-visible:ring-transparent">
          {type === 'wechat' && (
            <div className="relative pb-[36.5%]">
              <Image
                src="/contact/wechat.png"
                fill
                alt="前端嘛-微信公众号"
                sizes="900px"
              />
            </div>
          )}

          {type === 'support' && (
            <div className="text-slate-600">
              <p>1. 您的赞助将用于本站维护（服务器、CDN等）</p>
              <p>2. 学生党禁止打赏</p>
              <Image
                src="/contact/support.jpg"
                width={200}
                height={200}
                alt=""
                className="mx-auto"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
