import Image from 'next/image';
import tencent from './tencent.png';

const MarketingContent = () => {
  return (
    <div className="space-y-4">
      <section className="rounded-md overflow-hidden border border-[rgba(0, 0, 0, 0.08)]">
        <a
          href="https://curl.qcloud.com/WzmBmevq"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative pb-[47.8%]">
            <Image src={tencent} fill alt="腾讯云" sizes="780px" />
          </div>
        </a>
      </section>

      <section>
        <div className="relative pb-[36.5%]">
          <Image
            src="/contact/wechat-gzh.png"
            fill
            alt="前端嘛-微信公众号"
            sizes="780px"
          />
        </div>
      </section>

      <section className="flex items-center border border-[rgba(0, 0, 0, 0.08)] rounded-md p-2">
        <div className="flex-1 space-y-1">
          <h2 className="font-bold">赞助本站 1 元</h2>

          <div className="text-slate-600 text-xs">
            <p>您的赞助将用于维护本站（服务器、CDN等），感谢您的支持</p>
          </div>
        </div>
        <div className="w-[100px]">
          <Image
            src="/contact/support.jpg"
            width={100}
            height={100}
            alt=""
            className="mx-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default MarketingContent;
