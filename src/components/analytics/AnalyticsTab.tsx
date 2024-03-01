'use client'
import React from 'react';
import { AndroidOutlined, AppleOutlined, UserSwitchOutlined, DiffOutlined, PicRightOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import ProgressAnalytics from './progress/ProgressAnalytics';
import UsageAnlytics from './usage/UsageAnalytics';
import ScoreAnalytics from './scores/ScoreAnalytics';

export default function AnalyticsTab() {

  const tabsItems: TabsProps["items"] = [
    // {
    //   label: (
    //     <button className="text-lg lg:text-xl text-center font-bold    px-3 py-2 flex gap-2 border-r- border-slate-00">
    //       <UserSwitchOutlined
    //         style={{
    //           fontSize: "1.4rem",
    //         }}
    //       />{" "}
    //       <h1 className=" text-sm md:text-lg lg:text-xl">Usage</h1>
    //     </button>
    //   ),
    //   key: "usage",
    //   children: <UsageAnlytics />
    // },
    // {
    //   label: (
    //     <button className="text-lg lg:text-xl text-center font-bold    px-3 py-2 flex gap-2 border-r- border-slate-00">
    //       <DiffOutlined
    //         style={{
    //           fontSize: "1.4rem",
    //         }}
    //       />{" "}
    //       <h1 className=" text-sm md:text-lg lg:text-xl">Scores </h1>
    //     </button>
    //   ),
    //   key: "Scores",
    //   children: <ScoreAnalytics />
    // },
    {
      label: (
        <button className="text-lg lg:text-xl text-center font-bold    px-3 py-2 flex gap-2 border-r- border-slate-600">
          <PicRightOutlined
            style={{
              fontSize: "1.4rem",
            }}
          />{" "}
          <h1 className=" text-sm md:text-lg lg:text-xl">Progress </h1>
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
