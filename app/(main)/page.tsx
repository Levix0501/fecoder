import MainAsideLayout from '@/components/layouts/main-aside-layout';
import { prisma } from '@/prisma';
import dayjs from 'dayjs';
import Image from 'next/image';
import RelativeTime from './_components/relative-time';
import Link from 'next/link';

export default async function Home() {
  const articles = await prisma.article.findMany({
    orderBy: { createTime: 'desc' },
    include: { cover: true, author: { include: { avatar: true } } },
  });

  return (
    <MainAsideLayout>
      {/* <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <CardLink href="/roadmap" className="p-6">
          <div className="flex items-center space-x-2">
            <Image src={`/home/roadmap.png`} alt="" width={64} height={64} />

            <h3 className="text-[#0074de] text-lg font-medium group-hover:text-[var(--ds-gray-1000)]">
              学习路线
            </h3>
          </div>
          <p className="text-sm text-[var(--ds-gray-900)] font-normal">
            为每个学习节点提供丰富的文章、视频、网站等资源，助你全面掌握前端开发，适合中国宝宝体质的
            Roadmap
          </p>
        </CardLink>
        <CardLink href="/nav" className="p-6">
          <div className="flex items-center space-x-2">
            <Image src={`/home/nav.png`} alt="" width={64} height={64} />

            <h3 className="text-[#0074de] text-lg font-medium group-hover:text-[var(--ds-gray-1000)]">
              前端导航
            </h3>
          </div>
          <p className="text-sm text-[var(--ds-gray-900)] font-normal">
            轻松找到前端开发学习资料、开发工具、以及社区资源等
          </p>
        </CardLink>
        <CardLink href="/code-fun" className="p-6">
          <div className="flex items-center space-x-2">
            <Image src={`/home/fun.png`} alt="" width={64} height={64} />

            <h3 className="text-[#0074de] text-lg font-medium group-hover:text-[var(--ds-gray-1000)]">
              趣玩前端
            </h3>
          </div>
          <p className="text-sm text-[var(--ds-gray-900)] font-normal">
            基于现代前端技术的简单应用和互动示例
          </p>
        </CardLink>
      </div> */}
      <div className="max-w-[600px] sm:w-[600px]">
        {articles.map((article) => (
          <div key={article.id}>
            <article className="flex flex-col gap-2 text-base text-[#232323] pb-2">
              <div className="bg-[#eee] mb-1 h-[1px]"></div>
              <div className="flex gap-3">
                <div className="w-[54px] h-[54px] flex justify-center items-center rounded-full">
                  <Image
                    src={article.author.avatar.url}
                    width={48}
                    height={48}
                    alt="avatar"
                  />
                </div>

                <div className="flex-1">
                  <Link href={article.slug}>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{article.author.name}</span>

                      <RelativeTime dateTime={article.createTime} />
                    </div>

                    <h2 className="my-1">{article.title}</h2>

                    <p>{article.desc}</p>

                    {article.cover && (
                      <div
                        style={{
                          aspectRatio:
                            article.cover.width / article.cover.height,
                        }}
                        className="relative mt-3 mb-2 rounded-lg"
                      >
                        <Image
                          src={article.cover.url}
                          fill
                          alt=""
                          sizes="600px"
                        />
                      </div>
                    )}
                  </Link>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    </MainAsideLayout>
  );
}
