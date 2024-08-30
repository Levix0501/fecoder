'use client';

import Beginner from '@/content/roadmap/frontend-beginner/beginner.svg';
import styles from './styles.module.scss';
import { useRouter } from 'next/navigation';

interface RoadmapProps {
  title: string;
}

const Roadmap = ({ title }: RoadmapProps) => {
  const router = useRouter();

  return (
    <div
      className={styles['roadmap-wrapper']}
      data-cell-id="roadmap-wrapper"
      onClick={(e) => {
        let target = e.target as HTMLElement | null;
        while (target && !target.dataset.cellId) {
          target = target.parentElement;
        }
        if (target && target.dataset.cellId?.startsWith('rm-')) {
          const cellId = target.dataset.cellId;
          router.push(`/roadmap/${title}/${cellId.split('-')[1]}`);
        }
      }}
    >
      {title === 'frontend-beginner' && <Beginner />}
    </div>
  );
};

export default Roadmap;
