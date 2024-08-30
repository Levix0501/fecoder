'use server';
import { serialize } from 'next-mdx-remote/serialize';
import highlight from 'rehype-highlight';
import { visit } from 'unist-util-visit';

export const decodeMdx = async (content: string) => {
  const source = await serialize(content, {
    parseFrontmatter: true,
    mdxOptions: {
      rehypePlugins: [
        () => (tree) => {
          visit(tree, (node) => {
            if (node?.type === 'element' && node?.tagName === 'pre') {
              const [codeEl] = node.children;
              if (codeEl.tagName !== 'code') {
                return;
              }
              node.properties['__raw__'] = codeEl.children?.[0]?.value;
            }
          });
        },
        highlight,
      ],
    },
  });

  // @ts-ignore
  const regex = /```html(.*?)```/s;
  const match = content.match(regex);
  if (match) {
    const html = match[1].trim();
    return { ...source, html };
  }
};
