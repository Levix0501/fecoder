import { allCodeFuns } from '@/.contentlayer/generated';
import CardLink from '@/components/card-link/card-link';

import Image from 'next/image';

const CodeFunPage = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {allCodeFuns
        .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
        .map((e) => (
          <CardLink key={e._id} href={`/code-fun/${e.slugAsParams}`}>
            <div className="relative pb-[58%]">
              <Image
                src={`${e.slug}.png`}
                fill
                alt={e.title}
                className="object-cover"
                sizes="512px"
              />
            </div>

            <h2 className="p-2 text-slate-500 text-base">{e.title}</h2>
          </CardLink>
        ))}
    </div>
  );
};

export default CodeFunPage;
