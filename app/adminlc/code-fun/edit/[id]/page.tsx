'use client';
import {
  decodeMdx,
  createCodeFun,
  fetchCodeFunById,
  updateCodeFun,
} from '@/actions/code-fun';
import { components } from '@/components/mdx-components';
import MdxRemoteClient from '@/components/mdx/mdx-remote-client';
import { Textarea } from '@/components/ui/textarea';
import { Button } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
import useSWR from 'swr';

const CodeFunEditPage = ({ params: { id } }: { params: { id: string } }) => {
  const { isLoading } = useSWR(
    '/admin/code-fun/edit',
    () => fetchCodeFunById(id),
    {
      onSuccess(data, key, config) {
        data?.content && setContent(data?.content);
      },
    }
  );
  const [content, setContent] = useState('');
  const [source, setSource] = useState<any>(null);
  const [html, setHtml] = useState('');

  if (isLoading) {
    return <div>loading...</div>;
  }

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
                await updateCodeFun(
                  {
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
                    updateTime: dayjs().toISOString(),
                  },
                  id
                );

                location.replace('/adminlc/code-fun');
              }}
            >
              更新
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

export default CodeFunEditPage;
