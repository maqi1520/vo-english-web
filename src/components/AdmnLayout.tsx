import {
  FileTextOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import s from '../styles/admin/home.module.css';

const { Header, Content, Sider } = Layout;

const menus = [
  { key: 'user', href: '/admin', name: '用户管理', icon: <UserOutlined /> },
  {
    key: 'video',
    href: '/admin/video',
    name: '视频管理',
    icon: <VideoCameraOutlined />,
  },
  {
    key: 'article',
    href: '/admin/article',
    name: '文章管理',
    icon: <FileTextOutlined />,
  },
];

export default function AdmnLayout({ children }) {
  const router = useRouter();
  let selectedKey;
  if (router.pathname === '/admin') {
    selectedKey = 'user';
  } else {
    selectedKey = router.pathname.split('/')[2];
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsible>
        <div className={s.logo} />
        <Menu theme="dark" mode="inline" selectedKeys={[selectedKey]}>
          {menus.map((menu) => (
            <Menu.Item key={menu.key} icon={menu.icon}>
              <Link href={menu.href}>
                <a>{menu.name}</a>
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header className={s.header} style={{ padding: 0 }}></Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div className={s.layout}>{children}</div>
        </Content>
      </Layout>
    </Layout>
  );
}
