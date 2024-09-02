import { Card, CardContent } from '@/components/ui/card';
import { prisma } from '@/prisma';
import { notFound } from 'next/navigation';
import DetailLayout from '../_components/detail-layout';

import MdxRemoteServer from '@/components/mdx/mdx-remote-server';
import CodeFunBreadcrumb from '../_components/breadcrumb';
import Navigation from '../_components/navigation';
import { Metadata } from 'next';
import { absoluteUrl } from '@/lib/utils';

interface CodeFunDetailPageProps {
  params: {
    slug: string;
  };
}

// function getCodeFunDocFromSlug(slug: CodeFunDetailPageProps['params']['slug']) {
//   if (slug.length && ['preview', 'doc'].includes(slug[slug.length - 1])) {
//     slug = slug.slice(0, slug.length - 1);
//   }

//   const doc = allCodeFuns.find((doc) => doc.slugAsParams === slug.join('/'));

//   if (!doc) {
//     return null;
//   }

//   return doc;
// }

export async function generateMetadata({
  params: { slug },
}: CodeFunDetailPageProps): Promise<Metadata> {
  const codeFun = await prisma.codeFun.findUnique({ where: { slug } });

  if (!codeFun) {
    return {};
  }

  return {
    title: codeFun.title + ' - 前端嘛',
    description: codeFun.desc,
    keywords: codeFun.keywords,
    openGraph: {
      title: codeFun.title,
      description: codeFun.desc,
      type: 'article',
      url: absoluteUrl(codeFun.slug),

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
      title: codeFun.title,
      description: codeFun.desc,

      // images: [siteConfig.ogImage],
    },
  };
}

export async function generateStaticParams(): Promise<
  CodeFunDetailPageProps['params'][]
> {
  const allCodeFuns = await prisma.codeFun.findMany({ take: 100 });
  return allCodeFuns.map((codeFun) => ({ slug: codeFun.slug }));
}

const CodeFunDetailPage = async ({
  params: { slug },
}: CodeFunDetailPageProps) => {
  const codeFun = await prisma.codeFun.findUnique({ where: { slug } });

  if (!codeFun) {
    notFound();
  }

  return (
    <>
      <CodeFunBreadcrumb title={codeFun.title} />
      {/* <Navigation /> */}
      {!codeFun.isResponsive && (
        <p className="text-slate-400">建议在电脑端预览</p>
      )}
      <Card>
        <CardContent className="p-0">
          <div className="w-full pb-[calc(100vh-15rem)] relative rounded-md overflow-hidden">
            <iframe
              srcDoc={codeFun.htmlStr}
              className="absolute w-full h-full"
            ></iframe>
          </div>
        </CardContent>
      </Card>

      <MdxRemoteServer source={codeFun.content} />
    </>
  );
};

export default CodeFunDetailPage;
