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
      key: 'assets',
      label: '资源',
      children: [
        {
          key: 'image',
          label: <Link href="/adminlc/assets/image">图片</Link>,
        },
      ],
    },
    {
      key: 'code-fun',
      label: '趣玩前端',
      children: [
        {
          key: 'list',
          label: <Link href="/adminlc/code-fun/list">列表</Link>,
        },
      ],
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
