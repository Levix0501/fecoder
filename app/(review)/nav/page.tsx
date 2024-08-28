import { NAV_DATA } from '@/content/nav';
import NavItems from './_components/card-item';
import { Metadata } from 'next';
import { absoluteUrl } from '@/lib/utils';

export async function generateMetadata(): Promise<Metadata> {
  const { title, description, keywords } = {
    title: '前端导航 - 前端嘛',
    description:
      '“前端导航”涵盖了从基础知识到高级技术的各类资源，包括React、Vue、Angular、Three.js、CSS、JavaScript等前端框架与工具。通过这个导航，开发者可以轻松找到学习资料、开发工具、以及社区资源，全面提升前端开发技能。',
    keywords:
      '前端技术导航, React, Vue, Angular, Three.js, CSS, JavaScript, 前端框架, 开发工具, 编程资源, 前端学习, Web开发导航',
  };

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type: 'website',
      url: absoluteUrl('/nav'),

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

const NavPage = () => {
  return (
    <>
      <h1 className="text-[var(--ds-gray-1000)] mb-8 font-semibold text-4xl">
        前端导航
      </h1>
      <p className="text-[var(--tw-prose-body)]">更新中...</p>
      {NAV_DATA.map((part) => (
        <section key={part.title}>
          <h2 className="text-primary font-bold text-2xl pt-10 border-[var(--ds-gray-200)] border-t mt-12 mb-6">
            {part.title}
          </h2>

          {part.items && <NavItems items={part.items} />}

          {part.sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xl mt-8 mb-3 font-semibold text-[var(--tw-prose-headings)]">
                {section.title}
              </h3>
              <NavItems items={section.items} />
            </div>
          ))}
        </section>
      ))}
    </>
  );
};

export default NavPage;
