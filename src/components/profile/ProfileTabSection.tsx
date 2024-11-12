import { Tabs } from 'antd';
import React from 'react';

// File: types.ts
export interface Tab {
  key: string;
  label: string;
  children: React.ReactNode;
}

export default function ProfileTabSection({
  items = [], // Provide a default value for 'items' to avoid 'undefined'
}: {
  items?: Tab[];
}) {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div className="mx-auto mt-5 w-full">
      <Tabs defaultActiveKey="1" onChange={onChange}>
        {items?.map((item, index) => (
          <Tabs.TabPane key={item.key} tab={item.label}>
            {item.children}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
}
