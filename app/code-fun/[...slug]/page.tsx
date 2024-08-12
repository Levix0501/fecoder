import { allCodeFuns } from '@/.contentlayer/generated';
import { Mdx } from '@/components/mdx-components';
import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DetailLayout from '../_components/detail-layout';
import dayjs from 'dayjs';

interface CodeFunDetailPageProps {
  params: {
    slug: string[];
  };
}

function getCodeFunDocFromSlug(slug: CodeFunDetailPageProps['params']['slug']) {
  if (slug.length && ['preview', 'doc'].includes(slug[slug.length - 1])) {
    slug = slug.slice(0, slug.length - 1);
  }

  const doc = allCodeFuns.find((doc) => doc.slugAsParams === slug.join('/'));

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params: { slug },
}: CodeFunDetailPageProps): Promise<Metadata> {
  const doc = getCodeFunDocFromSlug(slug);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title + ' - 前端嘛',
    description: doc.description,
    keywords: doc.keywords,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: absoluteUrl(doc.slug),

      // images: [
      //   {
      //     url: siteConfig.ogImage,
      //     width: 1200,
      //     height: 630,
      //     alt: siteConfig.name,
      //   },
      // ],
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.description,

      // images: [siteConfig.ogImage],
    },
  };
}

export async function generateStaticParams(): Promise<
  CodeFunDetailPageProps['params'][]
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

const CodeFunDetailPage = ({ params: { slug } }: CodeFunDetailPageProps) => {
  const doc = getCodeFunDocFromSlug(slug);

  if (!doc) {
    notFound();
  }

  return (
    <DetailLayout title={doc.title} path={`/code-fun/${slug.join('/')}`}>
      {slug[slug.length - 1] === 'doc' ? (
        <Mdx code={doc.body.code} />
      ) : (
        <div
          className="w-full relative rounded-md overflow-hidden"
          style={{
            paddingBottom:
              doc.previewHeight && doc.previewWidth
                ? `${(doc.previewHeight / doc.previewWidth) * 100}%`
                : '56%',
          }}
        >
          <iframe
            src={`/code-fun/${slug[0]}.html`}
            className="absolute w-full h-full"
          ></iframe>
        </div>
      )}
    </DetailLayout>
  );
};

export default CodeFunDetailPage;
