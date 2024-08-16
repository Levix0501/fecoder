'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navArr = [
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
  );
};
