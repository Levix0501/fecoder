import { allCodeFuns } from '@/.contentlayer/generated';
import { notFound } from 'next/navigation';
import Navigation from '../_components/navigation';
import { Mdx } from '@/components/mdx-components';

interface CodeFunPageProps {
  params: {
    slug: string[];
  };
}

function getCodeFunDocFromSlug(slug: CodeFunPageProps['params']['slug']) {
  if (slug.length && ['preview', 'doc'].includes(slug[slug.length - 1])) {
    slug = slug.slice(0, slug.length - 1);
  }
  const doc = allCodeFuns.find((doc) => doc.slugAsParams === slug.join('/'));

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateStaticParams(): Promise<
  CodeFunPageProps['params'][]
> {
  return allCodeFuns
    .map((doc) => [
      {
        slug: doc.slugAsParams.split('/'),
      },
      {
        slug: [...doc.slugAsParams.split('/'), 'preview'],
      },
      {
        slug: [...doc.slugAsParams.split('/'), 'doc'],
      },
    ])
    .flat();
}

const CodeFunPage = ({ params: { slug } }: CodeFunPageProps) => {
  const doc = getCodeFunDocFromSlug(slug);
  if (!doc) {
    notFound();
  }

  if (slug[slug.length - 1] === 'doc') {
    return <Mdx code={doc.body.code} />;
  }

  return (
    <iframe
      src={`/code-fun/${slug[0]}.html`}
      className="w-full h-[calc(100vh-128px)]"
    ></iframe>
  );
};

export default CodeFunPage;
