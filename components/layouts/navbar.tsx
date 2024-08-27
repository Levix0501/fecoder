'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Button } from '../ui/button';
import { AlignRight } from 'lucide-react';
import { useState } from 'react';

const navArr = [
  {
    slug: 'roadmap',
    label: '学习路线',
    href: '/roadmap',
  },
  {
    slug: 'nav',
    label: '前端导航',
    href: '/nav',
  },
  {
    slug: 'code-fun',
    label: '趣玩前端',
    href: '/code-fun',
  },
  // {
  //   id: 'basic',
  //   label: '必知必会',
  //   href: '/basic/javascript/prototype',
  // },
];

export const Navbar = () => {
  const slugs = usePathname().split('/');
  return (
    <div className="hidden sm:block">
      <div className="flex items-center gap-6">
        {navArr.map(({ slug, href, label }) => {
          const isActive = slugs.includes(slug);
          return (
            <Link
              key={slug}
              href={href}
              className={cn('transition-colors text-sm text-accents-5', {
                'hover:text-foreground': !isActive,
                'text-geist-success': isActive,
              })}
              style={{
                textShadow: isActive ? '0 0 .5px var(--geist-success)' : void 0,
              }}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export const MobileNav = () => {
  const slugs = usePathname().split('/');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <Sheet open={isOpen} onOpenChange={(e) => setIsOpen(e)}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="w-8 h-8 p-0 focus-visible:ring-transparent"
          >
            <AlignRight size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>

          {navArr.map(({ slug, href, label }) => {
            const isActive = slugs.includes(slug);
            return (
              <div key={slug} className="py-3" onClick={() => setIsOpen(false)}>
                <Link
                  href={href}
                  className={cn('transition-colors text-base text-accents-5', {
                    'hover:text-foreground': !isActive,
                    'text-geist-success': isActive,
                  })}
                  style={{
                    textShadow: isActive
                      ? '0 0 .5px var(--geist-success)'
                      : void 0,
                  }}
                >
                  {label}
                </Link>
              </div>
            );
          })}
        </SheetContent>
      </Sheet>
    </div>
  );
};
