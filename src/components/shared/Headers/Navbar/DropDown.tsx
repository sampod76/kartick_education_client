import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space,  Menu } from "antd";

import Link from "next/link";

const itemsData = [
  {
    label: "Services",
    link: "/services",
    children: [
      {
        label: "Web Development",
        link: "/services/web-development",
        children: [
          {
            label: "Frontend",
            link: "/services/web-development/frontend",
          },
          {
            label: "Backend",
            link: "/services/web-development/backend",
            children: [
              {
                label: "Node.js",
                link: "/services/web-development/backend/node-js",
              },
              {
                label: "Express.js",
                link: "/services/web-development/backend/express-js",
              },
            ],
          },
        ],
      },
      {
        label: "Graphic Design",
        link: "/services/graphic-design",
      },
      {
        label: "Digital Marketing",
        link: "/services/digital-marketing",
      },
    ],
  },
];



const DropDown = ({children}:{children:React.ReactNode}) => {


  const generateSubMenu = (data: any[]) => {
    return data.map((item) => (
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

  const menu = <Menu>{generateSubMenu(itemsData)}</Menu>;

  // console.log(convertMenuItems);
  // console.log("items data", items);
  return (
    <Dropdown overlay={menu}>
      <Space>
        {children}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};

export default DropDown;
