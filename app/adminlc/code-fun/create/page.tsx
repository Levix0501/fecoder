'use client';

import { components } from '@/components/mdx-components';
import { Textarea } from '@/components/ui/textarea';
import request from '@/lib/request';
import '@/styles/highlight.css';
import { MDXRemote } from 'next-mdx-remote';
import Image from 'next/image';
import { useState } from 'react';

import { Button, Upload } from 'antd';
import { UploadCloud } from 'lucide-react';
import { createCodeFun, decodeMdx } from '@/actions/code-fun';
import dayjs from 'dayjs';
import MdxRemoteClient from '@/components/mdx/mdx-remote-client';

const AdminCodeFunCreatePage = () => {
  const [content, setContent] = useState('');
  const [source, setSource] = useState<any>(null);
  const [html, setHtml] = useState('');

  const onChange = async (val: string) => {
    setContent(val);
    // request.post('/api/code-fun/preview', { content: val }).then((res) => {
    //   setSource(res);
    // });
    decodeMdx(val).then((res) => {
      console.log(res);
      setSource(res.source);
      setHtml(res.html ?? '');
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
            <Button
              onClick={async () => {
                await createCodeFun({
                  slug: source.frontmatter.slug,
                  content,
                  title: source.frontmatter.title,
                  desc: source.frontmatter.description,
                  keywords: source.frontmatter.keywords,
                  date: dayjs(source.frontmatter.date).toISOString(),
                  isResponsive: source.frontmatter.mobile,
                  cover: { connect: { id: source.frontmatter.cover } },
                  htmlStr: html,
                  status: 0,
                  createTime: dayjs().toISOString(),
                  updateTime: dayjs().toISOString(),
                });

                location.replace('/adminlc/code-fun');
              }}
            >
              创建
            </Button>
            <div>slug: {source.frontmatter.slug}</div>
            <div>cover: {source.frontmatter.cover}</div>
            <div>title: {source.frontmatter.title}</div>
            <div>desc: {source.frontmatter.description}</div>
            <div>keywords: {source.frontmatter.keywords}</div>
            <div>date: {source.frontmatter.date}</div>
            <div>mobile: {source.frontmatter.mobile}</div>
            <iframe srcDoc={html}></iframe>
            <MdxRemoteClient {...source} components={components} />
          </>
        )}
      </div>
    </main>
  );
};

export default AdminCodeFunCreatePage;
