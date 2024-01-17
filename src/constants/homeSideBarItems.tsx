import type { MenuProps } from "antd";
import {
  HomeOutlined,
  TabletOutlined,
  UserOutlined,
  ContactsFilled,
  ControlOutlined,
  EuroOutlined,
  EditOutlined,
  FundOutlined,
  PicCenterOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const homeSideItems = () => {
  const homeSIdeItems: MenuProps["items"] = [
    {
      label: (
        <Link  href="/">
          Home
        </Link>
      ),
      key: "1",
      icon: <HomeOutlined  />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/learning">
          Learning
        </Link>
      ),
      key: "/learning",
      icon: <EditOutlined  />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/subscription">
          Subscription
        </Link>
      ),
      key: "/subscription",
      icon: <EuroOutlined  />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/">
          Assessment
        </Link>
      ),
      key: "/assessment",
      icon: <ControlOutlined  />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/">
          Analysis
        </Link>
      ),
      key: "/analysis",
      icon: <FundOutlined  />,
    },

    {
      label: (
        <Link  href="/contact">
          Contact
        </Link>
      ),
      key: "/contact",
      icon: <ContactsFilled  />,
    },
    {
      label: (
        <Link  href="/">
          About
        </Link>
      ),
      key: "/About",
      icon: <UserOutlined  />,
    },
    {
      label: (
        <Link  href="/dashboard">
          Dashboard
        </Link>
      ),
      key: "/dashboard",
      icon: <PicCenterOutlined  />,
    },
  ];

  return homeSIdeItems;
};

export default homeSideItems;
