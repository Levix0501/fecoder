import CardLink from '@/components/card-link/card-link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="py-10">
      <section className="pb-10 border-b border-[var(--accents-2)]">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <CardLink href="/nav" target="_blank" className="p-6">
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
            <CardLink href="/" target="_blank" className="p-6">
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
        </div>
      </section>

      <section className="py-10 border-b border-[var(--accents-2)]">
        <div className="container">
          <h2 className="text-center mb-5 text-2xl sm:text-3xl font-bold">
            微信公众号
          </h2>

          <div className="mx-auto max-w-80">
            <div className="relative pb-[36.5%]">
              <Image
                src="/contact/wechat-gzh.png"
                fill
                alt="前端嘛-微信公众号"
                sizes="900px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10">
        <div className="container">
          <h2 className="text-center mb-5 text-2xl sm:text-3xl font-bold">
            赞助本站 1 元
          </h2>

          <div className="text-slate-600 text-center space-y-2">
            <p>您的赞助将用于维护本站（服务器、CDN等），感谢您的支持</p>

            <Image
              src="/contact/support.jpg"
              width={200}
              height={200}
              alt=""
              className="mx-auto"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
