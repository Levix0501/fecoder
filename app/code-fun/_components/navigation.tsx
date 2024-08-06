'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const getPath = (slug: string[]) => {
  const last = slug[slug.length - 1];
  const isDoc = last === 'doc';
  if (isDoc) {
    return {
      previewPath: slug.slice(0, slug.length - 1).join('/'),
      docPath: slug.join('/'),
      isDoc,
    };
  }

  return {
    previewPath: slug.join('/'),
    docPath:
      (last === 'preview'
        ? slug.slice(0, slug.length - 1).join('/')
        : slug.join('/')) + '/doc',
    isDoc,
  };
};

const Navigation = () => {
  const pathname = usePathname();
  const { previewPath, docPath, isDoc } = getPath(pathname.split('/'));

  return (
    <div className="h-16 flex justify-center items-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href={previewPath} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), {
                  'text-accent-foreground bg-accent': !isDoc,
                })}
              >
                预览
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href={docPath} legacyBehavior passHref>
              <NavigationMenuLink
                className={cn(navigationMenuTriggerStyle(), {
                  'text-accent-foreground bg-accent': isDoc,
                })}
              >
                代码
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default Navigation;
