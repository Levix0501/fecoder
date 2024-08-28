'use client';
import React, { useEffect, useRef } from 'react';
import {
  type WalineInstance,
  type WalineInitOptions,
  init,
} from '@waline/client';
import styles from './styles.module.scss';
import '@waline/client/style';
import { usePathname } from 'next/navigation';

export type WalineOptions = Omit<WalineInitOptions, 'el' | 'serverURL'> & {
  path: string;
};

const _Waline = (props: WalineOptions) => {
  const walineInstanceRef = useRef<WalineInstance | null>(null);
  const containerRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    walineInstanceRef.current = init({
      ...props,
      el: containerRef.current,
      serverURL: process.env.NEXT_PUBLIC_WALINE_SERVER_URL!,
      copyright: false,
      login: 'disable',
      meta: ['nick', 'mail'],
      requiredMeta: ['nick', 'mail'],
    });

    return () => walineInstanceRef.current?.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    walineInstanceRef.current?.update(props);
  }, [props]);

  return (
    <div className="mt-10">
      <div ref={containerRef} className={styles['waline']} />
    </div>
  );
};

export const Waline = () => {
  const pathname = usePathname().replace('/doc', '');
  return <_Waline path={pathname} />;
};
