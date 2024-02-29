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

const homeSideItems = (role: string | null): MenuProps["items"] => {


  const defaultSideItems: MenuProps["items"] = [
    {
      label: (
        <Link href="/">
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
      icon: <EditOutlined />,
    },
    // {
    //   label: (
    //     <Link className="text-base font-thin font-serif" href="/subscription">
    //       Subscription
    //     </Link>
    //   ),
    //   key: "/subscription",
    //   icon: <EuroOutlined />,
    // },
    // {
    //   label: (
    //     <Link className="text-base font-thin font-serif" href="/">
    //       Assessment
    //     </Link>
    //   ),
    //   key: "/assessment",
    //   icon: <ControlOutlined />,
    // },
    // {
    //   label: (
    //     <Link className="text-base font-thin font-serif" href="/">
    //       Analysis
    //     </Link>
    //   ),
    //   key: "/analytics",
    //   icon: <FundOutlined />,
    // },

    {
      label: (
        <Link href="/contact">
          Contact
        </Link>
      ),
      key: "/contact",
      icon: <ContactsFilled />,
    },
    {
      label: (
        <Link href="/about">
          About
        </Link>
      ),
      key: "/About",
      icon: <UserOutlined />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/subscription">
          Membership
        </Link>
      ),
      key: "/Membership",
      icon: <EuroOutlined />,
    },
    {
      label: (
        <Link href="/dashboard">
          Dashboard
        </Link>
      ),
      key: "/dashboard",
      icon: <PicCenterOutlined />,
    },
  ];

  // return defaultSideItems;

  const loginUserNavItem = [
    ...defaultSideItems,
    {
      label: (
        <Link className="text-base font-thin font-serif capitalize" href="/analytics">
          Analysis
        </Link>
      ),
      key: "/analytics",
      icon: <ControlOutlined />
    },
  ]
  if (role) {
    return loginUserNavItem
  }
  else {
    return defaultSideItems
  }
};

export default homeSideItems;
