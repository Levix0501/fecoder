import fs from 'fs';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { join } from 'path';

export const getDirectoryRoutes = async (
  directoryPath: string
): Promise<string[][]> => {
  const routes: string[][] = [];
  try {
    const stats = await fs.promises.stat(directoryPath);
    if (stats.isDirectory()) {
      const filenames = await fs.promises.readdir(directoryPath);
      for (const name of filenames) {
        const path = join(directoryPath, name);
        const children = await getDirectoryRoutes(path);
        children.forEach((item) => {
          if (!item.length) {
            item.push(name.split('.')[0]);
          } else {
            item.unshift(name);
          }
          routes.push(item);
        });
      }
    } else if (stats.isFile()) {
      routes.push([]);
    }
  } catch (error) {
    console.error(error);
  }

  return routes;
};

export const getFileMatterResult = async (slug: string[]) => {
  try {
    const postPath = join(process.cwd(), 'content', ...slug) + '.md';
    const contents = await fs.promises.readFile(postPath, 'utf-8');
    const { data, content } = matter(contents);
    return {
      metadata: {
        title: data.title,
      },
      content,
    };
  } catch (error) {
    notFound();
  }
};
