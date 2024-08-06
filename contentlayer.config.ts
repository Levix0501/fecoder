// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files';

export const CodeFun = defineDocumentType(() => ({
  name: 'CodeFun',
  filePathPattern: `code-fun/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    keywords: { type: 'string', required: true },
    date: { type: 'string', required: true },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => `/${doc._raw.flattenedPath}`,
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
  },
}));

export default makeSource({
  contentDirPath: './content',
  documentTypes: [CodeFun],
});
