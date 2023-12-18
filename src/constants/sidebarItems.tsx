import type { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  AppstoreOutlined,
  ScheduleOutlined,
  ThunderboltOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  AccountBookFilled,
  AlipayCircleFilled,
  BorderOuterOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ShopOutlined,
  MessageOutlined,
  DatabaseOutlined,
  ControlOutlined,
  UsergroupAddOutlined,
  ContainerOutlined,
  TabletOutlined,
  QuestionOutlined,
  PlusSquareOutlined,
  InsertRowLeftOutlined,
  UserOutlined,
  SnippetsOutlined,
  ContactsFilled,
  CommentOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
import DropDown from "@/components/shared/Headers/Navbar/DropDown";
export const sidebarItems = (role: string) => {
  const homeNavItems: MenuProps["items"] = [
    {
      label: <Link href={`/`}> Homes</Link>,

      key: `/Home`,
    },
    {
      key: "Learning",
      label: <Link href="/Learning-us">Learning</Link>,
    },
    {
      key: "assetment",
      // label: <Link href="/">Assetment</Link>,
      label: <DropDown>Assessment</DropDown>,
    },
    {
      key: "analysis",
      label: <DropDown>Analysises</DropDown>,
    },
    {
      key: "contact",
      label: <Link href="/">Contact Us</Link>,
    },
  ];

  const homeSIdeItems: MenuProps["items"] = [
    {
      label: <Link href={`/`}> Home</Link>,
      icon: <HomeOutlined />,
      key: `/Home`,
    },

    {
      key: "about",
      label: <Link href="about-us">ABout</Link>,
      icon: <UserOutlined />,
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

  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/overview`}>Overview</Link>,
      icon: <TableOutlined />,
      key: `/${role}/overview`,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/profile`}>Account Profile</Link>,
          key: `/${role}/profile`,
        },
      ],
    },
  ];

  const commonAdminSidebarItems: MenuProps["items"] = [
    {
      label: <Link href={`/${role}/manage-user`}>Manage User</Link>,
      icon: <AppstoreOutlined />,
      key: `/${role}/manage-user`,
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: "Manage service",
      key: "manage-service",
      icon: <ScheduleOutlined />,
      children: [
        {
          label: <Link href={`/${role}/service`}>Service List</Link>,
          key: `/${role}/service`,
        },
        {
          label: <Link href={`/${role}/service/create`}>Create Service </Link>,
          key: `/${role}/service/create`,
        },
      ],
    },
    {
      label: "Manage category",
      key: "manage-category",
      icon: <CreditCardOutlined />,
      children: [
        {
          label: <Link href={`/${role}/category/create`}>Create Category</Link>,
          key: `/${role}/category/create`,
        },
        {
          label: <Link href={`/${role}/category`}>Category List</Link>,
          key: `/${role}/category`,
        },
      ],
    },
    {
      label: "Manage booking",
      key: "manage-booking",
      icon: <FileTextOutlined />,
      children: [
        {
          label: <Link href={`/${role}/booking`}>Booking List</Link>,
          key: `/${role}/booking`,
        },
      ],
    },
    {
      label: "Manage Content",
      key: "manage-content",
      icon: <ThunderboltOutlined />,
      children: [
        {
          label: <Link href={`/${role}/blog`}>Blog List</Link>,
          key: `/${role}/blog`,
        },
        {
          label: <Link href={`/${role}/faq`}>Faq List</Link>,
          key: `/${role}/faq`,
        },
      ],
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...adminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <AlipayCircleFilled />,
      key: `/${role}/admin`,
    },
  ];

  const generalUserSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    {
      label: <Link href={`/${role}/booking`}>Booking History</Link>,
      icon: <ThunderboltOutlined />,
      key: `/${role}/Service`,
    },
    {
      label: <Link href={`/${role}/review`}>Review/Feedback History</Link>,
      icon: <AccountBookFilled />,
      key: `/${role}/review`,
    },

    {
      label: <Link href={`/${role}/support`}>Support and Help</Link>,
      icon: <BorderOuterOutlined />,
      key: `/${role}/support`,
    },
  ];

  console.log(role, "role...");

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.GENERAL_USER) return generalUserSidebarItems;
  // else if ((role = "homeNav")) return homeNavItems;
  else if ((role = "homeSidBar")) return homeSIdeItems;
};