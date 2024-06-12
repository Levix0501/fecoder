import { Metadata } from 'next';
import path from 'path';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { getDirectoryRoutes, getFileMatterResult } from '@/lib/fs';
import { siteConfig } from '@/site-config';

type PageProps = {
  params: { slug: string[] };
};

export const generateMetadata = async ({
  params: { slug },
}: PageProps): Promise<Metadata> => {
  const { metadata } = await getFileMatterResult(slug);
  return {
    title: `${metadata.title ?? '404'} | ${siteConfig.name}`,
  };
};

const BlogPage = async ({ params: { slug } }: PageProps) => {
  const { content } = await getFileMatterResult(slug);

  return (
    <article className="prose prose-vercel max-w-none">
      <MDXRemote source={content} />
    </article>
  );
};

export default BlogPage;

export async function generateStaticParams() {
  const postsDirectory = path.join(process.cwd(), 'content');
  const routes = await getDirectoryRoutes(postsDirectory);
  return routes.map((e) => ({ slug: e }));
}
