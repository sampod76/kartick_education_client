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

const homeSideItems = (onClose?: any) => {
  const homeSIdeItems: MenuProps["items"] = [
    {
      label: (
        <Link onClick={onClose} href="/">
          Home
        </Link>
      ),
      key: "1",
      icon: <HomeOutlined onClick={onClose} />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/learning">
          Learning
        </Link>
      ),
      key: "/learning",
      icon: <EditOutlined onClick={onClose} />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/subscription">
          Subscription
        </Link>
      ),
      key: "/subscription",
      icon: <EuroOutlined onClick={onClose} />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/">
          Assessment
        </Link>
      ),
      key: "/assessment",
      icon: <ControlOutlined onClick={onClose} />,
    },
    {
      label: (
        <Link className="text-base font-thin font-serif" href="/">
          Analysis
        </Link>
      ),
      key: "/analysis",
      icon: <FundOutlined onClick={onClose} />,
    },

    {
      label: (
        <Link onClick={onClose} href="/contact">
          Contact
        </Link>
      ),
      key: "/contact",
      icon: <ContactsFilled onClick={onClose} />,
    },
    {
      label: (
        <Link onClick={onClose} href="/">
          About
        </Link>
      ),
      key: "/About",
      icon: <UserOutlined onClick={onClose} />,
    },
    {
      label: (
        <Link onClick={onClose} href="/dashboard">
          Dashboard
        </Link>
      ),
      key: "/dashboard",
      icon: <PicCenterOutlined onClick={onClose} />,
    },
  ];

  return homeSIdeItems;
};

export default homeSideItems;
