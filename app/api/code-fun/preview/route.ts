import { serialize } from 'next-mdx-remote/serialize';
import { NextRequest, NextResponse } from 'next/server';
import highlight from 'rehype-highlight';
import { visit } from 'unist-util-visit';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const source = await serialize(data.content, {
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
  const match = data.content.match(regex);
  if (match) {
    const html = match[1].trim();
    return NextResponse.json({ ...source, html });
  }

  return NextResponse.json({});
}
