'use client';

import { components } from '@/components/mdx-components';
import { Textarea } from '@/components/ui/textarea';
import '@/styles/highlight.css';
import { MDXRemote } from 'next-mdx-remote';
import { useState } from 'react';

const AdminCodeFunPage = () => {
  const [content, setContent] = useState('');
  const [source, setSource] = useState<any>(null);

  const onChange = (val: string) => {
    setContent(val);
    fetch('/api/code-fun/preview', {
      method: 'post',
      body: JSON.stringify({ content: val }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSource(res);
      });
  };

  return (
    <main className="container flex h-screen p-4 gap-4">
      <div className="flex-1 h-full">
        <Textarea
          className="h-full"
          value={content}
          onChange={(e) => onChange(e.currentTarget.value)}
        />
      </div>
      <div className="flex-1 h-full">
        {source && (
          <>
            <div>title: {source.frontmatter.title}</div>
            <div>desc: {source.frontmatter.description}</div>
            <div>keywords: {source.frontmatter.keywords}</div>
            <div>date: {source.frontmatter.date}</div>
            <iframe srcDoc={source.html}></iframe>
            <MDXRemote {...source} components={components} />
          </>
        )}
      </div>
    </main>
  );
};

export default AdminCodeFunPage;
