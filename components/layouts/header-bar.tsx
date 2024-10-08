import Link from 'next/link';
import { siteConfig } from '@/site-config';
import { MobileNav, Navbar } from './navbar';
import Logo from '../logo';
import { MoreMenu } from '../more-menu';
import { Button } from '../ui/button';
import { AlignRight } from 'lucide-react';

export const HeaderBar = () => {
  return (
    <header className="sticky top-0 z-50 pl-6 pr-1 sm:px-6 h-16 shadow-[inset_0_-1px_0_0] shadow-accents-2 bg-[hsla(0,0%,100%,.8)] backdrop-saturate-[180%] backdrop-blur-[5px]">
      <nav className="w-full h-full flex justify-between items-center max-w-[var(--ds-page-width)]">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Logo />
            <p className="font-semibold text-foreground">{siteConfig.name}</p>
          </div>
        </Link>

        <Navbar />

        <div className="flex">
          <MobileNav />
          {/* <MoreMenu /> */}
        </div>
      </nav>
    </header>
  );
};
