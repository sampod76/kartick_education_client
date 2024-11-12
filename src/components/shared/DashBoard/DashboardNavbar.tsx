'use client';
import React from 'react';
import './NaveBar.module.css';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
// import UserAvatarUI from "@/components/ui/NavUI/UserAvatarUI";
import { useRouter } from 'next/navigation';
const UserAvatarUI = React.lazy(
  () => import('@/components/ui/NavUI/UserAvatarUI'),
);
const { Header } = Layout;
const styles = {
  main: {
    backgroundColor: '#f1f1f1',
    width: '100%',
  },
  inputText: {
    padding: '10px',
    color: 'red',
  },
};
const DashboardNavBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: any;
}) => {
  const router = useRouter();

  return (
    <nav>
      <Header
        style={{
          display: 'flex',

          justifyContent: 'space-between',
          color: '#000000',
          backgroundColor: '#ffffff',
          boxShadow:
            '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          paddingInline: '3px',
          marginLeft: '0.5rem',
          marginRight: '0.5rem',

          borderRadius: '0 0.5rem 0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

          {/* <Logo></Logo> */}
        </div>

        <div>
          <UserAvatarUI />
        </div>
      </Header>
    </nav>
  );
};

export default DashboardNavBar;
