import type { MenuProps } from "antd";
import {
  HomeOutlined,
  TabletOutlined,
  UserOutlined,
  ContactsFilled,
  ControlOutlined,
  EuroOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const homeSideItems = (onClose?: any) => {
  const homeSIdeItems: MenuProps["items"] = [
    {
      label: (
        <Link onClick={onClose} href="/">
          Home
        </Link>
      ),
      key: "1",
      icon: <HomeOutlined />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/learning">
          Learning
        </Link>
      ),
      key: "/learning",
      icon: <TabletOutlined />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/subscription">
          Subscription
        </Link>
      ),
      key: "/subscription",
      icon: <TabletOutlined />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/">
          Assessment
        </Link>
      ),
      key: "/assessment",
      icon: <ControlOutlined />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/">
          Analysis
        </Link>
      ),
      key: "/analysis",
      icon: <EuroOutlined />,
    },
    {
      label: (
        <Link onClick={onClose} href="/contact">
          Contact
        </Link>
      ),
      key: "/contact",
      icon: <ContactsFilled />,
    },
    {
      label: (
        <Link onClick={onClose} href="/">
          About
        </Link>
      ),
      key: "/About",
      icon: <UserOutlined />,
    },
    {
      label: (
        <Link onClick={onClose} href="/">
          Dashboard
        </Link>
      ),
      key: "/dashboard",
    },
  ];

  return homeSIdeItems;
};

export default homeSideItems;
