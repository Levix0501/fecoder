import CardLink from '@/components/card-link/card-link';
import MainAsideLayout from '@/components/layouts/main-aside-layout';
import Image from 'next/image';

export default function Home() {
  return (
    <MainAsideLayout>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </MainAsideLayout>
  );
}
