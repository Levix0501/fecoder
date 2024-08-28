import { allRoadmaps } from '@/.contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { notFound } from 'next/navigation';

interface RoadmapNodePageProps {
  params: {
    title: string;
    node: string;
  };
}

const RoadmapNodePage = ({ params: { title, node } }: RoadmapNodePageProps) => {
  const doc = allRoadmaps.find((e) => e.slugAsParams === `${title}/${node}`);

  if (!doc) {
    notFound();
  }

  return <Mdx code={doc.body.code} />;
};

export default RoadmapNodePage;
