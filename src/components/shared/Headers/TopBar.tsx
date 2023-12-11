
import React from "react";
import { Collapse, Space } from "antd";
import {
  FacebookFilled,
  TwitterCircleFilled,
  PlusOutlined,
  MinusOutlined,
} from "@ant-design/icons";

const TopBar = () => {
  return (
    <div className="py-2 bg-primary text-white px-2 sticky top-0 w-[auto] overflow-hidden backdrop-blur-2xl z-20">
      <div className=" hidden  lg:flex justify-between items-center py-2">
        <section className="flex items-center justify-start gap-2 text-white ">
          <h2>
            <FacebookFilled />
          </h2>
          <h2>
            <TwitterCircleFilled />
          </h2>
        </section>
        <section className="flex items-center justify-center gap-2">
          <h3 className="px-3 bg-red-600 rounded-md">offer  </h3>
          <p className="font-mono">10% Off per Square</p>
        </section>
      </div>
      <Space className="w-full lg:hidden border-none" direction="vertical">
        <Collapse
          //   collapsible="header"
          //   defaultActiveKey={["1"]}
          items={[
            {
              key: "1",
              label: (
                <section className="flex items-center justify-end gap-2 text-white">
                  <h3 className="px-3  bg-red-600 ">offer </h3>
                  <p className="font-mono">10% Off per Square</p>
                </section>
              ),
              children: (
                <section className="flex items-center justify-start gap-2 text-white ">
                  <h2>
                    <FacebookFilled />
                  </h2>
                  <h2>
                    <TwitterCircleFilled />
                  </h2>
                </section>
              ),
            },
          ]}
          ghost
          expandIcon={() => (
            <h1>
              <PlusOutlined className="text-white font-extrabold" />
            </h1>
          )}
        />
      </Space>
    </div>
  );
};

export default TopBar;
