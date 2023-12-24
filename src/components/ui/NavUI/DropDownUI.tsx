import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space,  Menu } from "antd";

import Link from "next/link";


const DropDownUI = ({children,itemData}:{children:React.ReactNode,itemData:any}) => {

  const generateSubMenu = (data: any[]) => {
    return data?.map((item) => (
      <Menu.Item
        style={{
          // background:"red",
          // padding: "1rem",
          minWidth:"10rem",
          padding:"1rem"
        }}
        key={item.label}
      >
        {item.children ? (
          <Menu.SubMenu
            style={{
              // background: "blue",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#023047",
              
            }}
            key={item.label}
            title={<Link  className="text-[15px] text-[#023047] font-[600] ml-0" href={item.link}>{item.label}1</Link>}
          >
            {generateSubMenu(item.children)}
          </Menu.SubMenu>
        ) : (
          <Link className="text-[15px] text-[#023047] font-[600]" href={item.link}>{item.label}2</Link>
        )}
      </Menu.Item>
    ));
  };

  const menu = <Menu>{generateSubMenu(itemData)}</Menu>;

  return (
    <Dropdown overlay={menu}>
      <Link href={`/courses/${children}`}>
        {children}
        <DownOutlined />
      </Link>
    </Dropdown>
  );
};

export default DropDownUI;
