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
  BorderOuterOutlined
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
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

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.GENERAL_USER) return generalUserSidebarItems;
  else {
    return defaultSidebarItems;
  }
};
