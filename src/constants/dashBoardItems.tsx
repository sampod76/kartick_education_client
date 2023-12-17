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
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const dashboardItems = (role: USER_ROLE) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/profile`}>Your Profile</Link>,
          key: `/${role}/profile`,
        },
      ],
    },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,

    {
      label: "Manage Users",
      key: "manage-user",
      icon: <ScheduleOutlined />,
      children: [
        {
          label: "All Users",
          key: "All-users",
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <Link href={`/admin/manage-users/all-users`}>Users List</Link>
              ),
              key: `/admin/user/all-users-list`,
            },
            {
              label: (
                <Link href={`/admin/manage-users/all-users/create`}>
                  Create user{" "}
                </Link>
              ),
              key: `/admin/manage-users/create`,
            },
          ],
        },
        {
          label: "Students",
          key: "students",
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <Link href={`/admin/manage-users/students`}>Students List</Link>
              ),
              key: `admin/manage-users/students`,
            },
            {
              label: (
                <Link href={`/admin/manage-users/students/create`}>
                  Create Student
                </Link>
              ),
              key: `/admin/manage-users/students/create`,
            },
          ],
        },
        {
          label: "Trainers",
          key: "trainers",
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <Link href={`/admin/manage-users/trainers`}>Trainers List</Link>
              ),
              key: `/admin/manage-users/trainers`,
            },
            {
              label: (
                <Link href={`/admin/manage-users/all-users/trainers/create`}>
                  Create Trainer
                </Link>
              ),
              key: `//admin/manage-users/all-users/trainers/create`,
            },
          ],
        },
        {
          label: "Moderators",
          key: "moderators",
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <Link href={`/admin/manage-users/moderators`}>Moderators List</Link>
              ),
              key: `/admin/manage-users/moderators`,
            },
            {
              label: (
                <Link href={`/admin/manage-users/all-users/moderators/create`}>
                  Create Moderator
                </Link>
              ),
              key: `//admin/manage-users/all-users/moderators/create`,
            },
          ],
        },
      
      ],
    },
    {
      label: "Manage category",
      key: "manage-category",
      icon: <CreditCardOutlined />,
      children: [
        {
          label: <Link href={`/admin/category`}>Category List</Link>,
          key: `/admin/category`,
        },
        {
          label: <Link href={`/admin/category/create`}>Create Category</Link>,
          key: `/admin/category/create`,
        },
       
      ],
    },
    {
      label: "Manage Course",
      key: "manage-Course",
      icon: <FileTextOutlined />,
      children: [
        
        {
          label: <Link href={`/admin/course`}>Course List</Link>,
          key: `/admin/Course`,
        },
        {
          label: <Link href={`/admin/course/create`}>Create course</Link>,
          key: `/admin/Course/create`,
        },
      ],
    },
    {
      label: "Manage Milestone",
      key: "manage-Milestone",
      icon: <ThunderboltOutlined />,
      children: [
        
        {
          label: <Link href={`/admin/milestone`}>Milestone List</Link>,
          key: `/admin/milestone`,
        },
        {
          label: <Link href={`/admin/milestone/create`}>Create Milestone</Link>,
          key: `/admin/milestone/create`,
        },
      ],
    },
    {
      label: "Manage lesson",
      key: "manage-lesson",
      icon: <ThunderboltOutlined />,
      children: [
        
        {
          label: <Link href={`/admin/module`}>Modules List</Link>,
          key: `/admin/module`,
        },
        {
          label: <Link href={`/admin/module/create`}>Create modules</Link>,
          key: `/admin/module/create`,
        },
      ],
    },
    {
      label: "Manage Lesson",
      key: "manage-lesson",
      icon: <ThunderboltOutlined />,
      children: [
        
        {
          label: <Link href={`/admin/lesson`}>lesson List</Link>,
          key: `/admin/lesson`,
        },
        {
          label: <Link href={`/admin/lesson/create`}>Create Lesson</Link>,
          key: `/admin/lesson/create`,
        },
      ],
    },
  ];

  const moderatorSidebarItems: MenuProps["items"] = [
    ...adminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <AlipayCircleFilled />,
      key: `/${role}/admin`,
    },
  ];

  const studentSidebarItems: MenuProps["items"] = [
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

  if (role === USER_ROLE.ADMIN) return moderatorSidebarItems;
  else if (role === USER_ROLE.MODERATOR) return adminSidebarItems;
  else if (role === USER_ROLE.STUDENT) return studentSidebarItems;
};
