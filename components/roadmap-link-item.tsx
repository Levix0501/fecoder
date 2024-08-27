import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface RoadmapLinkItemProps {
  type: 'article' | 'video';
  href: string;
  label: ReactNode;
}

const RoadmapLinkItem = ({ type, href, label }: RoadmapLinkItemProps) => {
  return (
    <div className="mt-1">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group font-medium text-gray-800 underline underline-offset-1 hover:text-black"
      >
        <span
          className={cn(
            'mr-2 inline-block rounded px-1.5 py-0.5 text-xs uppercase no-underline',
            {
              'bg-yellow-300': type === 'article',
              'bg-purple-300': type === 'video',
            }
          )}
        >
          {type === 'article' ? '文章' : '视频'}
        </span>
        {label}
      </a>
    </div>
  );
};

export default RoadmapLinkItem;
