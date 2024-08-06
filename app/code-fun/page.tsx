import { allCodeFuns } from '@/.contentlayer/generated';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const CodeFunPage = () => {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
      {allCodeFuns
        .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
        .map((e) => (
          <Link key={e._id} href={`/code-fun/${e.slugAsParams}`}>
            <Card className="overflow-hidden">
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
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default CodeFunPage;
