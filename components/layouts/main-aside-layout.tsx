import { ReactNode } from 'react';
import MarketingContent from '../marketing/marketing-content';

const MainAsideLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="py-6 lg:py-8 container sm:flex gap-5">
      <div className="flex-1">{children}</div>

      <aside className="hidden sm:block w-[260px]">
        <MarketingContent />
      </aside>
    </main>
  );
};

export default MainAsideLayout;
