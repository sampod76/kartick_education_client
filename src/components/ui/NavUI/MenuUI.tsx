import React from "react";
import { Menu as AntMenu } from "antd";
import Link from "next/link";
const SubMenu = AntMenu.SubMenu;
const MenuItem = AntMenu.Item;


const MenuUI = ({ itemData }:{itemData:any}) => {

const generateMenuItems = (data:any) => {
  return data?.map((item:any) => {
    if (item.children) {
      return (
        <SubMenu key={item.key} icon={item.icon} title={item.label}>
          {generateMenuItems(item.children)}
        </SubMenu>
      );
    } else {
      return (
        <MenuItem key={item.key} icon={item.icon}>
          <Link href={item.label.props.href}>{item.label.props.children}</Link>
        </MenuItem>
      );
    }
  });
};
  return (
    <AntMenu mode="inline" style={{ borderRight: "none" }}>
      {generateMenuItems(itemData)}
    </AntMenu>
  );
};

export default MenuUI;
