'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navArr: any[] = [
  // {
  //   id: 'basic',
  //   label: '必知必会',
  //   href: '/basic/javascript/prototype',
  // },
];

export const Navbar = () => {
  const ids = usePathname().split('/');
  return (
    <div>
      {navArr.map(({ id, href, label }) => {
        const isActive = ids[1] === id;
        return (
          <Link
            key={id}
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
