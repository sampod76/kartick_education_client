'use client'
import React from 'react';
import { AndroidOutlined, AppleOutlined, UserSwitchOutlined, DiffOutlined, PicRightOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import ProgressAnalytics from './progress/ProgressAnalytics';

export default function AnalyticsTab() {

  const tabsItems: TabsProps["items"] = [
    {
      label: (
        <button className="text-lg lg:text-xl text-center font-bold    px-3 py-2 flex gap-2 border-r-2 border-slate-600">
          <UserSwitchOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />{" "}
          <h1 className=" text-sm md:text-lg lg:text-2xl">Usage</h1>
        </button>
      ),
      key: "1",
      children: 'Usage sections'
    },
    {
      label: (
        <button className="text-lg lg:text-xl text-center font-bold    px-3 py-2 flex gap-2 border-r-2 border-slate-600">
          <DiffOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />{" "}
          <h1 className=" text-sm md:text-lg lg:text-2xl">Scores Section</h1>
        </button>
      ),
      key: "Scores",
      children: 'Scores'
    },
    {
      label: (
        <button className="text-lg lg:text-xl text-center font-bold    px-3 py-2 flex gap-2 border-r- border-slate-600">
          <PicRightOutlined
            style={{
              fontSize: "1.5rem",
            }}
          />{" "}
          <h1 className=" text-sm md:text-lg lg:text-2xl">Progress Section</h1>
        </button>
      ),
      key: "Progress",
      children: <ProgressAnalytics />
    },

  ]
  return (
    <div className='w-full lg:max-w-[70%] mx-auto'>
      <Tabs
        defaultActiveKey="2"
        items={tabsItems}
        indicatorSize={100}
        style={{

        }}
      // tabPosition="bottom"

      // indicator={{ size: (origin) => origin - 20, align: 'center' }}
      />

    </div>
  )
}
