import { ReactNode } from 'react';
import MarketingContent from '../marketing/marketing-content';

const MainAsideLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="py-6 lg:py-8 container sm:flex justify-center gap-5">
      <div>{children}</div>

      <aside className="hidden md:block w-[260px]">
        <div className="sticky top-[5.5rem] lg:top-24">
          <MarketingContent />
        </div>
      </aside>
    </main>
  );
};

export default MainAsideLayout;
