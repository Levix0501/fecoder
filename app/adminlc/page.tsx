import { compile } from '@mdx-js/mdx';
import { run } from '@mdx-js/mdx';
import matter from 'gray-matter';
import { Mdx } from '@/components/mdx-components';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { visit } from 'unist-util-visit';
import highlight from 'rehype-highlight';
import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/copy-button';
import RoadmapLinkItem from '@/components/roadmap-link-item';
import '@/styles/highlight.css';

const content = `---
title: 不要轻易相信自己的眼睛
description: 这个页面展示了一个利用前端技术实现的3D立体方块动画，通过CSS3和JavaScript创建了多层立方体旋转效果，展示了复杂的三维动画和视觉效果。
keywords: 前端技术, 3D动画, 立体方块, CSS3, JavaScript, 网页视觉效果, 动态交互, 三维动画
date: 2024-08-11
mobile: true
---

\`\`\`html
<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>不要轻易相信自己的眼睛</title>
    <style>
      * {
        transform-style: preserve-3d;
      }
      body {
        margin: 0;
        height: 100vh;
        background: linear-gradient(315deg, #0d0a0b 0%, #004942 74%);
        background: radial-gradient(circle at 50% 25%, #004942, #02111c);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }
      body:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-conic-gradient(
            #0003 0%,
            #fff0 0.00033%,
            #fff0 0.00066%,
            #fff0 0.00099%
          ), repeating-conic-gradient(#fff2 0%, #fff0 0.0005%, #fff0 0.0015%, #fff0
              0.019%);
        filter: blur(1px);
      }
      .content {
        width: 90vmin;
        height: 60vmin;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        perspective: 1500vmin;
        perspective-origin: center;
        filter: drop-shadow(-8vmin 12vmin 2vmin #0002);
      }
      .shape {
        transform: rotateX(-35deg) rotateY(-45deg);
        transition: all 2s ease-in-out 0s;
        animation: move 1.95s ease-in-out 0s 2 alternate;
        position: relative;
        top: -15vmin;
      }
      @keyframes move {
        0% {
          transform: rotateX(-35deg) rotateY(-45deg);
        }
        100% {
          transform: rotateX(-20deg) rotateY(-125deg) translateZ(-22vmin) translateY(
              5vmin
            );
        }
      }
      .content:hover .shape {
        transform: rotateX(-20deg) rotateY(-125deg) translateZ(-22vmin) translateY(
            5vmin
          );
        transition: all 2s ease-in-out 0s;
      }
      .content:hover .shape .cube .side:nth-of-type(2) {
        background: hsl(var(--hue), var(--sat), 80%);
      }
      .content:hover .shape .cube .side:nth-of-type(3) {
        background: hsl(var(--hue), var(--sat), 30%);
      }
      .cube {
        --width: 10;
        --height: 10;
        --depth: 10;
        height: calc(var(--height) * 1vmin);
        width: calc(var(--width) * 1vmin);
        --hue: 150;
        --sat: 25%;
        position: absolute;
      }
      .side {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
      }
      .side:before,
      .side:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-conic-gradient(
            #0003 0%,
            #fff0 0.0003%,
            #fff0 0.0006%,
            #fff0 0.00099%
          ), repeating-conic-gradient(#fff2 0%, #fff0 0.0005%, #fff0 0.0015%, #fff0
              0.019%);
        background-size: 102% 102%;
        filter: blur(0.5px);
      }
      .side:after {
        filter: blur(2px);
      }
      @keyframes light {
        0% {
          background: hsl(var(--hue), var(--sat), 40%);
        }
        100% {
          background: hsl(var(--hue), var(--sat), 80%);
        }
      }
      .side:nth-of-type(1) {
        transform: translate3d(-50%, -50%, calc(var(--depth) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 40%);
      }
      .side:nth-of-type(2) {
        transform: translate3d(-50%, -50%, calc(var(--depth) * -0.5vmin)) rotateY(
            180deg
          );
        background: hsl(var(--hue), var(--sat), 30%);
        animation: light 1.95s ease-in 0s 2 alternate;
        transition: all 1.95s ease-in 0s;
      }
      .side:nth-of-type(3) {
        width: calc(var(--depth) * 1vmin);
        transform: translate(-50%, -50%) rotateY(90deg) translate3d(0, 0, calc(var(
                  --width
                ) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 80%);
        animation: light 1.95s ease-in 0s 2 alternate-reverse;
        transition: all 1.95s ease-in 0s;
      }
      .side:nth-of-type(4) {
        width: calc(var(--depth) * 1vmin);
        transform: translate(-50%, -50%) rotateY(-90deg) translate3d(0, 0, calc(var(
                  --width
                ) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 70%);
      }
      .side:nth-of-type(5) {
        height: calc(var(--depth) * 1vmin);
        transform: translate(-50%, -50%) rotateX(90deg) translate3d(0, 0, calc(var(
                  --height
                ) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 60%);
      }
      .side:nth-of-type(6) {
        height: calc(var(--depth) * 1vmin);
        transform: translate(-50%, -50%) rotateX(-90deg) translate3d(0, 0, calc(var(
                  --height
                ) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 60%);
      }
      .step1 {
        transform: translate3d(-22vmin, 0vmin, 0vmin);
        --width: 22;
      }
      .step2 {
        transform: translate3d(-22vmin, 9.95vmin, 0vmin);
        --height: 12;
      }
      .step3 {
        transform: translate3d(5vmin, 0vmin, 0vmin);
        --width: 22;
      }
      .step4 {
        transform: translate3d(17vmin, 0vmin, 10.85vmin);
        --depth: 12;
      }
      .step5 {
        transform: translate3d(17vmin, 0vmin, 32vmin);
        --depth: 22;
      }
      .step6 {
        transform: translate3d(17vmin, -11.85vmin, 38vmin);
        --height: 12;
      }
      .step3 .side:nth-of-type(1) {
        width: 53%;
        left: 26%;
      }
      .step4 .side:nth-of-type(2) {
        display: none;
      }
      .step5 .side:nth-of-type(5) {
        background: linear-gradient(
          180deg,
          hsl(var(--hue), var(--sat), 60%) 0 55%,
          #fff0 0 100%
        );
      }
      .step6 .side:nth-of-type(6) {
        display: none;
      }
      .step6 .side:nth-of-type(5) {
        clip-path: polygon(0 100%, 0 55%, 52% 55%, 52% 0, 100% 0, 100% 100%);
      }
      .step6 .side:nth-of-type(4) {
        clip-path: polygon(0 100%, 0 50%, 55% 55%, 55% 0, 100% 0, 100% 100%);
      }
      .step6 .side:nth-of-type(2) {
        clip-path: polygon(0 0, 47% 0, 47% 50%, 100% 50%, 100% 100%, 0 100%);
      }
    </style>
  </head>
  <body>
    <div class="content">
      <div class="shape">
        <div class="cube step1">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step2">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step3">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step4">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step5">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step6">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
      </div>
    </div>
  </body>
</html>
\`\`\`
`;

const AdminPage = async () => {
  const components = {
    LinkItem: (props: any) => <RoadmapLinkItem {...props} />,
    pre: ({
      className,
      __raw__,
      ...props
    }: React.HTMLAttributes<HTMLPreElement> & { __raw__?: string }) => {
      return (
        <div className="relative">
          <pre
            className={cn(
              'relative mb-4 mt-6 max-h-[500px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900 whitespace-pre-wrap',
              className
            )}
            {...props}
          />

          <CopyButton
            style={{ right: '16px', top: '16px' }}
            value={__raw__ ?? ''}
            className={cn('absolute right-4 top-4')}
          />
        </div>
      );
    },
    code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
      <code
        className={cn(
          'relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm',
          className
        )}
        {...props}
      />
    ),
  };
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
  console.log(source);
  return (
    <>
      <iframe
        srcDoc={`<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="UTF-8" />
    <title>不要轻易相信自己的眼睛</title>
    <style>
      * {
        transform-style: preserve-3d;
      }
      body {
        margin: 0;
        height: 100vh;
        background: linear-gradient(315deg, #0d0a0b 0%, #004942 74%);
        background: radial-gradient(circle at 50% 25%, #004942, #02111c);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }
      body:before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-conic-gradient(
            #0003 0%,
            #fff0 0.00033%,
            #fff0 0.00066%,
            #fff0 0.00099%
          ), repeating-conic-gradient(#fff2 0%, #fff0 0.0005%, #fff0 0.0015%, #fff0
              0.019%);
        filter: blur(1px);
      }
      .content {
        width: 90vmin;
        height: 60vmin;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        perspective: 1500vmin;
        perspective-origin: center;
        filter: drop-shadow(-8vmin 12vmin 2vmin #0002);
      }
      .shape {
        transform: rotateX(-35deg) rotateY(-45deg);
        transition: all 2s ease-in-out 0s;
        animation: move 1.95s ease-in-out 0s 2 alternate;
        position: relative;
        top: -15vmin;
      }
      @keyframes move {
        0% {
          transform: rotateX(-35deg) rotateY(-45deg);
        }
        100% {
          transform: rotateX(-20deg) rotateY(-125deg) translateZ(-22vmin) translateY(
              5vmin
            );
        }
      }
      .content:hover .shape {
        transform: rotateX(-20deg) rotateY(-125deg) translateZ(-22vmin) translateY(
            5vmin
          );
        transition: all 2s ease-in-out 0s;
      }
      .content:hover .shape .cube .side:nth-of-type(2) {
        background: hsl(var(--hue), var(--sat), 80%);
      }
      .content:hover .shape .cube .side:nth-of-type(3) {
        background: hsl(var(--hue), var(--sat), 30%);
      }
      .cube {
        --width: 10;
        --height: 10;
        --depth: 10;
        height: calc(var(--height) * 1vmin);
        width: calc(var(--width) * 1vmin);
        --hue: 150;
        --sat: 25%;
        position: absolute;
      }
      .side {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
      }
      .side:before,
      .side:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-conic-gradient(
            #0003 0%,
            #fff0 0.0003%,
            #fff0 0.0006%,
            #fff0 0.00099%
          ), repeating-conic-gradient(#fff2 0%, #fff0 0.0005%, #fff0 0.0015%, #fff0
              0.019%);
        background-size: 102% 102%;
        filter: blur(0.5px);
      }
      .side:after {
        filter: blur(2px);
      }
      @keyframes light {
        0% {
          background: hsl(var(--hue), var(--sat), 40%);
        }
        100% {
          background: hsl(var(--hue), var(--sat), 80%);
        }
      }
      .side:nth-of-type(1) {
        transform: translate3d(-50%, -50%, calc(var(--depth) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 40%);
      }
      .side:nth-of-type(2) {
        transform: translate3d(-50%, -50%, calc(var(--depth) * -0.5vmin)) rotateY(
            180deg
          );
        background: hsl(var(--hue), var(--sat), 30%);
        animation: light 1.95s ease-in 0s 2 alternate;
        transition: all 1.95s ease-in 0s;
      }
      .side:nth-of-type(3) {
        width: calc(var(--depth) * 1vmin);
        transform: translate(-50%, -50%) rotateY(90deg) translate3d(0, 0, calc(var(
                  --width
                ) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 80%);
        animation: light 1.95s ease-in 0s 2 alternate-reverse;
        transition: all 1.95s ease-in 0s;
      }
      .side:nth-of-type(4) {
        width: calc(var(--depth) * 1vmin);
        transform: translate(-50%, -50%) rotateY(-90deg) translate3d(0, 0, calc(var(
                  --width
                ) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 70%);
      }
      .side:nth-of-type(5) {
        height: calc(var(--depth) * 1vmin);
        transform: translate(-50%, -50%) rotateX(90deg) translate3d(0, 0, calc(var(
                  --height
                ) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 60%);
      }
      .side:nth-of-type(6) {
        height: calc(var(--depth) * 1vmin);
        transform: translate(-50%, -50%) rotateX(-90deg) translate3d(0, 0, calc(var(
                  --height
                ) * 0.5vmin));
        background: hsl(var(--hue), var(--sat), 60%);
      }
      .step1 {
        transform: translate3d(-22vmin, 0vmin, 0vmin);
        --width: 22;
      }
      .step2 {
        transform: translate3d(-22vmin, 9.95vmin, 0vmin);
        --height: 12;
      }
      .step3 {
        transform: translate3d(5vmin, 0vmin, 0vmin);
        --width: 22;
      }
      .step4 {
        transform: translate3d(17vmin, 0vmin, 10.85vmin);
        --depth: 12;
      }
      .step5 {
        transform: translate3d(17vmin, 0vmin, 32vmin);
        --depth: 22;
      }
      .step6 {
        transform: translate3d(17vmin, -11.85vmin, 38vmin);
        --height: 12;
      }
      .step3 .side:nth-of-type(1) {
        width: 53%;
        left: 26%;
      }
      .step4 .side:nth-of-type(2) {
        display: none;
      }
      .step5 .side:nth-of-type(5) {
        background: linear-gradient(
          180deg,
          hsl(var(--hue), var(--sat), 60%) 0 55%,
          #fff0 0 100%
        );
      }
      .step6 .side:nth-of-type(6) {
        display: none;
      }
      .step6 .side:nth-of-type(5) {
        clip-path: polygon(0 100%, 0 55%, 52% 55%, 52% 0, 100% 0, 100% 100%);
      }
      .step6 .side:nth-of-type(4) {
        clip-path: polygon(0 100%, 0 50%, 55% 55%, 55% 0, 100% 0, 100% 100%);
      }
      .step6 .side:nth-of-type(2) {
        clip-path: polygon(0 0, 47% 0, 47% 50%, 100% 50%, 100% 100%, 0 100%);
      }
    </style>
  </head>
  <body>
    <div class="content">
      <div class="shape">
        <div class="cube step1">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step2">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step3">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step4">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step5">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
        <div class="cube step6">
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
          <div class="side"></div>
        </div>
      </div>
    </div>
  </body>
</html>`}
      ></iframe>
      <MDXRemote
        components={components}
        source={content}
        options={{
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
        }}
      />
    </>
  );
};

export default AdminPage;
