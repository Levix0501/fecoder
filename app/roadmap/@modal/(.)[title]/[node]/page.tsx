import { allRoadmaps } from '@/.contentlayer/generated';
import { Modal } from './modal';
import { notFound } from 'next/navigation';
import { Mdx } from '@/components/mdx-components';

interface RoadmapNodeModalProps {
  params: {
    title: string;
    node: string;
  };
}

export default function RoadmapNodeModal({
  params: { title, node },
}: RoadmapNodeModalProps) {
  const doc = allRoadmaps.find((e) => e.slugAsParams === `${title}/${node}`);

  if (!doc) {
    notFound();
  }

  return (
    <Modal>
      <Mdx code={doc.body.code} />
    </Modal>
  );
}
