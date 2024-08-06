import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import { createContentlayerPlugin } from 'next-contentlayer2';

/** @type {import('next').NextConfig} */
const nextConfig = {};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

const withContentlayer = createContentlayerPlugin({
  // Additional Contentlayer config options
});

export default withContentlayer(nextConfig);
