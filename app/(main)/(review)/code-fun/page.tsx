import CardLink from '@/components/card-link/card-link';
import to from '@/lib/await-to';
import { prisma } from '@/prisma';
import dayjs from 'dayjs';
import Image from 'next/image';

export const revalidate = 4 * 3600; //

const CodeFunPage = async () => {
  const [error, data] = await to(
    prisma.codeFun.findMany({
      orderBy: { date: 'desc' },
      take: 100,
      include: { cover: true },
    })
  );

  const allCodeFuns = data ?? [];

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
      {allCodeFuns
        .filter(
          (doc) =>
            dayjs(doc.date).valueOf() <= dayjs().valueOf() + 4 * 3600 * 1000
        )
        .sort((a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf())
        .map((e) => (
          <CardLink key={e.id} href={`/code-fun/${e.slug}`}>
            <div className="relative pb-[58%]">
              <Image
                src={e.cover.url}
                fill
                alt={e.title}
                className="object-cover"
                sizes="650px"
              />
            </div>

            <h2 className="p-2 text-slate-500 text-base">{e.title}</h2>
          </CardLink>
        ))}
    </div>
  );
};

export default CodeFunPage;
