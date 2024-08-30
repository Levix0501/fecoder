import { absoluteUrl } from '@/lib/utils';
import { Metadata } from 'next';
import BeginnerRoadmap from './_components/roadmap';
import CardLink from '@/components/card-link/card-link';

export async function generateMetadata(): Promise<Metadata> {
  const { title, description, keywords } = {
    title: '学习路线 - 前端嘛',
    description:
      '“学习路线”提供了从前端基础知识到高级技术的学习路径。每个节点都包含了精选的文章、视频、和网站资源，帮助开发者系统性地掌握React、Vue、Angular、Three.js、CSS、JavaScript等前端框架与工具。',
    keywords:
      '学习路线, 前端技术学习, React, Vue, Angular, Three.js, CSS, JavaScript, 前端框架, 编程资源, 前端开发, Web开发学习',
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: absoluteUrl('/roadmap'),

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
      title,
      description,

      // images: [siteConfig.ogImage],
    },
  };
}

const RoadmapPage = () => {
  return (
    <>
      <h1 className="text-[var(--ds-gray-1000)] mb-8 font-semibold text-4xl">
        学习路线
      </h1>
      <p className="text-[var(--tw-prose-body)]">适合中国宝宝体质的 Roadmap</p>
      <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        <CardLink href="/roadmap/frontend-beginner" className="p-6">
          <div className="flex items-center space-x-2">
            <h3 className="text-[#0074de] text-lg font-medium group-hover:text-[var(--ds-gray-1000)]">
              前端小白入门
            </h3>
          </div>
          <p className="text-sm text-[var(--ds-gray-900)] font-normal">
            HTML、CSS、JS 入门路线
          </p>
        </CardLink>
      </div>
    </>
  );
};

export default RoadmapPage;
