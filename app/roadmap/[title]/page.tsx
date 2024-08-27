import { allRoadmaps } from '@/.contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { notFound } from 'next/navigation';
import Roadmap from '../_components/roadmap';

interface RoadmapPageProps {
  params: {
    title: string;
  };
}

const RoadmapPage = ({ params: { title } }: RoadmapPageProps) => {
  const doc = allRoadmaps.find((e) => e.slugAsParams === title);

  if (!doc) {
    notFound();
  }

  return (
    <>
      <Mdx code={doc.body.code} />
      <Roadmap title={title} />
    </>
  );
};

export default RoadmapPage;
