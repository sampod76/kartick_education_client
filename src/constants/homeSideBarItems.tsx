import type { MenuProps } from "antd";
import {
  HomeOutlined,
  TabletOutlined,
  UserOutlined,
  ContactsFilled,
} from "@ant-design/icons";
import Link from "next/link";
export const homeSIdeItems: MenuProps["items"] = [
  {
    label: <Link href={`/`}> Home</Link>,
    icon: <HomeOutlined />,
    key: `/Home`,
  },

  {
    key: "about",
    label: <Link href="about-us">ABout</Link>,
    icon: <UserOutlined />,
    children: [
      {
        label: <Link href={`/profile`}>Account Profile</Link>,
        key: `/profile`,
        children: [
          {
            label: <Link href={`/service`}>Service List</Link>,
            key: `/service`,
          },
          {
            label: <Link href={`/service/create`}>Create Service </Link>,
            key: `/service/create`,
          },
        ],
      },
    ],
  },

  {
    key: "gallery",
    label: <Link href="/gallery">Gallery</Link>,
    icon: <TabletOutlined />,
  },
  {
    key: "contact",
    label: <Link href="contact">Contact Us</Link>,
    icon: <ContactsFilled />,
  },
];
