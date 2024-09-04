'use client';
import { Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';
import { ListPlus, PartyPopper, Ticket } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const SideMenu = () => {
  const pathname = usePathname();
  const keyList = pathname.slice(1).split('/');

  const items: ItemType<MenuItemType>[] = [
    {
      key: 'revalidate',
      label: <Link href="/adminlc/revalidate">revalidate</Link>,
    },
    {
      key: 'article',
      label: <Link href="/adminlc/article">文章管理</Link>,
    },
    {
      key: 'image',
      label: <Link href="/adminlc/assets/image">图片管理</Link>,
    },
    {
      key: 'code-fun',
      label: <Link href="/adminlc/code-fun">趣玩前端</Link>,
    },
  ];

  return (
    <Menu
      key={pathname}
      style={{ width: 256 }}
      items={items}
      mode="inline"
      defaultSelectedKeys={keyList}
      defaultOpenKeys={keyList}
    />
  );
};
