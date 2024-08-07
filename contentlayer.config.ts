// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import path from 'path';
import fs from 'fs';

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
  onSuccess: async (getData) => {
    const data = await getData();
    console.log(data.allCodeFuns.length);
    const publicDir = path.join(process.cwd(), 'public', 'code-fun');
    await Promise.all(
      data.allCodeFuns.map(async (doc) => {
        const filePath = path.join(publicDir, `${doc.slugAsParams}.html`);
        // @ts-ignore
        const regex = /```html(.*?)```/s;
        const match = doc.body.raw.match(regex);
        if (match) {
          const content = match[1].trim();
          try {
            fs.writeFileSync(filePath, content);
            console.log(`Generated HTML file: ${filePath}`);
          } catch (error) {
            console.log(`error: ${error}`);
          }
        }
      })
    );
  },
});
