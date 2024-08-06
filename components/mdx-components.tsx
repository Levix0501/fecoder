'use client';

import type { MDXComponents } from 'mdx/types';
import { cn } from '../lib/utils';
import { CopyButton } from './copy-button';
import { useMDXComponent } from 'next-contentlayer2/hooks';

const components = {
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    return (
      <div className="relative">
        <pre
          className={cn(
            'relative mb-4 mt-6 overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900',
            className
          )}
          {...props}
        />

        <CopyButton
          style={{ right: '16px', top: '16px' }}
          value={(props.children as any).props.children}
          className={cn('absolute right-4 top-4')}
        />
      </div>
    );
  },
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        'relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm',
        className
      )}
      {...props}
    />
  ),
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="container px-3 prose">
      <Component components={components} />
    </div>
  );
}
