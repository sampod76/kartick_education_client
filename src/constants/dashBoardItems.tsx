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
  BookOutlined,
  DatabaseOutlined,
  AlignCenterOutlined,
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
                <Link href={`/admin/manage-users/all-users/create`}>
                  Create user{" "}
                </Link>
              ),
              key: `/admin/manage-users/create`,
            },
            {
              label: (
                <Link href={`/admin/manage-users/all-users`}>Users List</Link>
              ),
              key: `/admin/user/all-users-list`,
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
                <Link href={`/admin/manage-users/students/create`}>
                  Create Student
                </Link>
              ),
              key: `/admin/manage-users/students/create`,
            },
            {
              label: (
                <Link href={`/admin/manage-users/students`}>Students List</Link>
              ),
              key: `admin/manage-users/students`,
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
                <Link href={`/admin/manage-users/trainers/create`}>
                  Create Trainer
                </Link>
              ),
              key: `//admin/manage-users/trainers/create`,
            },
            {
              label: (
                <Link href={`/admin/manage-users/trainers`}>Trainers List</Link>
              ),
              key: `/admin/manage-users/trainers`,
            },
          ],
        },
        {
          label: "Admin",
          key: "admin",
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <Link href={`/admin/manage-users/admin/create`}>
                  Create Admin
                </Link>
              ),
              key: `/admin/manage-users/admin/create`,
            },
            {
              label: <Link href={`/admin/manage-users/admin`}>Admin List</Link>,
              key: `/admin/manage-users/admin`,
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
          label: <Link href={`/admin/category/create`}>Create Category</Link>,
          key: `/admin/category/create`,
        },
        {
          label: <Link href={`/admin/category`}>Category List</Link>,
          key: `/admin/category`,
        },
      ],
    },
    {
      label: "Manage Course",
      key: "manage-Course",
      icon: <FileTextOutlined />,
      children: [
        {
          label: <Link href={`/admin/course/create`}>Create course</Link>,
          key: `/admin/Course/create`,
        },

        {
          label: <Link href={`/admin/course`}>Course List</Link>,
          key: `/admin/Course`,
        },
      ],
    },
    {
      label: "Manage Milestone",
      key: "manage-Milestone",
      icon: <BookOutlined />,
      children: [
        {
          label: <Link href={`/admin/milestone/create`}>Create Milestone</Link>,
          key: `/admin/milestone/create`,
        },

        {
          label: <Link href={`/admin/milestone`}>Milestone List</Link>,
          key: `/admin/milestone`,
        },
      ],
    },
    {
      label: "Manage Module",
      key: "manage-Module",
      icon: <DatabaseOutlined />,
      children: [
        {
          label: <Link href={`/admin/module/create`}>Create modules</Link>,
          key: `/admin/module/create`,
        },
        {
          label: <Link href={`/admin/module`}>Modules List</Link>,
          key: `/admin/module`,
        },
      ],
    },
    {
      label: "Manage Lesson",
      key: "manage-lesson",
      icon: <AlignCenterOutlined />,
      children: [
        {
          label: <Link href={`/admin/lesson/create`}>Create Lesson</Link>,
          key: `/admin/lesson/create`,
        },
        {
          label: <Link href={`/admin/lesson`}>lesson List</Link>,
          key: `/admin/lesson`,
        },
      ],
    },
    {
      label: "Manage Quiz",
      key: "manage-quiz",
      icon: <ThunderboltOutlined />,
      children: [
        {
          label: <Link href={`/admin/quiz/create`}>Create Quiz</Link>,
          key: `/admin/quiz/create`,
        },
        {
          label: <Link href={`/admin/quiz`}>Quiz List</Link>,
          key: `/admin/quiz`,
        },
      ],
    },
    {
      label: "Manage Single Quiz",
      key: "manage-single-quiz",
      icon: <ThunderboltOutlined />,
      children: [
        {
          label: (
            <Link href={`/admin/single-quiz/create`}>Create Single Quiz</Link>
          ),
          key: `/admin/single-quiz/create`,
        },
        {
          label: <Link href={`/admin/single-quiz`}>Single Quiz List</Link>,
          key: `/admin/single-quiz`,
        },
      ],
    },
  ];

  const trainerSidebarItems: MenuProps["items"] = [
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

  if (role === USER_ROLE.TRAINER) return trainerSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.STUDENT) return studentSidebarItems;
};
