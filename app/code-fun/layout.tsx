import { ReactNode } from 'react';
import '@/styles/highlight.css';
import { Metadata } from 'next';
import { absoluteUrl } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const { title, description, keywords } = {
    title: '趣玩前端 - 前端嘛',
    description:
      '“趣玩前端”汇集了多种基于现代前端技术的简单应用和互动示例，涵盖React、Vue、Three.js、CSS、JavaScript等技术，旨在通过实际项目提高初学者的编程能力，激发对编程的兴趣。这些应用包括3D效果、动画交互和小型实用工具，帮助学习者掌握前端开发的核心技术和框架。',
    keywords:
      '前端技术, React, Vue, Three.js, CSS, JavaScript, 小型应用, 编程学习, 互动示例, 初学者, 前端框架, HTML5, Web开发',
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: absoluteUrl('/code-fun'),

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

const CodeFunLayout = ({ children }: { children: ReactNode }) => {
  return <main className="container py-6 lg:py-8">{children}</main>;
};

export default CodeFunLayout;
