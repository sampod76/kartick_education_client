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
  CalendarOutlined,
  UsergroupDeleteOutlined,
  ContainerOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  ContactsOutlined,
  UserSwitchOutlined,
  PayCircleFilled,
  ThunderboltFilled,
  PicLeftOutlined,
  ContactsFilled
} from "@ant-design/icons";
import { PiPackageDuotone } from "react-icons/pi";
import Link from "next/link";
import { USER_ROLE } from "./role";
import { GiJetPack } from "react-icons/gi";
import { CiLogin } from "react-icons/ci";
export const dashboardItems = (role: string, setCollapsed?: any) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: (
        <div>
          <Link
            onClick={() => (setCollapsed ? setCollapsed(false) : null)}
            href={`/dashboard`}
          >
            Dashboard
          </Link>
        </div>
      ),
      key: `/dashboard`,
      icon: <HomeOutlined />,
    },
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,

      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/profile`}
            >
              👩‍🏫 Your Profile
            </Link>
          ),
          key: `/${role}/profile`,
        },
        {
          label: <Link href={`/loginHistory`}>Login history</Link>,
          key: "Login history",
          icon: <CiLogin />,
        },
      ],
    },
  ];
  const trainerSidebarItems: MenuProps["items"] = [
    {
      label: "Category",
      key: "manage-category",
      icon: <CreditCardOutlined />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/category/create`}
            >
              Create Category
            </Link>
          ),
          key: `/${role}/category/create`,
        },
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/category`}
            >
              Category List
            </Link>
          ),
          key: `/${role}/category`,
        },
      ],
    },
    {
      label: "Course label",
      key: "Level",
      icon: <CreditCardOutlined />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/course_label/create`}
            >
              Create label
            </Link>
          ),
          key: `/${role}/course_label/create`,
        },
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/course_label`}
            >
              Label list
            </Link>
          ),
          key: `/${role}/course_label`,
        },
      ],
    },
    {
      label: " Course",
      key: "manage-Course",
      icon: <FileTextOutlined />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/course/create`}
            >
              Create course
            </Link>
          ),
          key: `/${role}/Course/create`,
        },

        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/course`}
            >
              Course List
            </Link>
          ),
          key: `/${role}/Course`,
        },
      ],
    },
    {
      label: " Milestone",
      key: "manage-Milestone",
      icon: <BookOutlined />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/milestone/create`}
            >
              Create Milestone
            </Link>
          ),
          key: `/${role}/milestone/create`,
        },

        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/milestone`}
            >
              Milestone List
            </Link>
          ),
          key: `/${role}/milestone`,
        },
      ],
    },
    {
      label: " Module",
      key: "manage-Module",
      icon: <DatabaseOutlined />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/module/create`}
            >
              Create modules
            </Link>
          ),
          key: `/${role}/module/create`,
        },
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/module`}
            >
              Modules List
            </Link>
          ),
          key: `/${role}/module`,
        },
      ],
    },
    {
      label: " Lesson",
      key: "manage-lesson",
      icon: <AlignCenterOutlined />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/lesson/create`}
            >
              Create Lesson
            </Link>
          ),
          key: `/${role}/lesson/create`,
        },
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/lesson`}
            >
              lesson List
            </Link>
          ),
          key: `/${role}/lesson`,
        },
      ],
    },
    {
      label: " Quiz",
      key: "manage-quiz",
      icon: <ThunderboltOutlined />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/quiz/create`}
            >
              Create Quiz
            </Link>
          ),
          key: `/${role}/quiz/create`,
        },
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/quiz`}
            >
              Quiz List
            </Link>
          ),
          key: `/${role}/quiz`,
        },
      ],
    },

    {
      label: " Single Quiz",
      key: "manage-single-quiz",
      icon: <ThunderboltFilled />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/single-quiz/create`}
            >
              Create Single Quiz
            </Link>
          ),
          key: `/${role}/single-quiz/create`,
        },
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/single-quiz`}
            >
              Single Quiz List
            </Link>
          ),
          key: `/${role}/single-quiz`,
        },
      ],
    },


  ];
  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...trainerSidebarItems,
    {
      label: " Users",
      key: "manage-user",
      icon: <UsergroupDeleteOutlined />,
      children: [
        {
          label: "All Users",
          key: "All-users",
          icon: <UserOutlined />,
          children: [
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/manage-users/all-users/create`}
                >
                  Create user{" "}
                </Link>
              ),
              key: `/${role}/manage-users/create`,
            },
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/manage-users/all-users`}
                >
                  Users List
                </Link>
              ),
              key: `/${role}/user/all-users-list`,
            },
          ],
        },
        {
          label: "Students",
          key: "students",
          icon: <ContactsOutlined />,
          children: [
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/manage-users/students/create`}
                >
                  Create Student
                </Link>
              ),
              key: `/${role}/manage-users/students/create`,
            },
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/manage-users/students`}
                >
                  Students List
                </Link>
              ),
              key: `${role}/manage-users/students`,
            },
          ],
        },
        {
          label: "Teacher",
          key: "teacher",
          icon: <UserSwitchOutlined />,
          children: [
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/manage-users/teachers/create`}
                >
                  Create Teacher
                </Link>
              ),
              key: `//${role}/manage-users/teachers/create`,
            },
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/manage-users/teachers`}
                >
                  Teacher List
                </Link>
              ),
              key: `/${role}/manage-users/teachers`,
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
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/manage-users/admin/create`}
                >
                  Create Admin
                </Link>
              ),
              key: `/${role}/manage-users/admin/create`,
            },
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/manage-users/admin`}
                >
                  Admin List
                </Link>
              ),
              key: `/${role}/manage-users/admin`,
            },
          ],
        },
      ],
    },
    {
      label: "Manage Package",
      key: "Manage-Package",
      icon: <GiJetPack />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/package/create`}
            >
              Create Package
            </Link>
          ),
          key: `/${role}/package/create`,
        },
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/package`}
            >
              Package List
            </Link>
          ),
          key: `/${role}/package`,
        },
      ],
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/purchase-package`}
        >
          Purchase Package History
        </Link>
      ),
      key: "Manage-pouches-package",
      icon: <PayCircleFilled />,
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/purchase-course`}
        >
          Purchase course History
        </Link>
      ),
      key: "Manage-pouches-course",
      icon: <PayCircleFilled />,
    },
    {
      label: "Manage Features",
      key: "manage-features",
      icon: <PicLeftOutlined />,
      children: [
        {
          label: "Advance Class",
          key: `/${role}/features/advance-class`,
          children: [
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/features/advance-class/create`}
                >
                  Create Advance Class
                </Link>
              ),
              key: `/${role}/features/advance-class/create`,
            },
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/features/advance-class`}
                >
                  Advance Class List
                </Link>
              ),
              key: `/${role}/features/advance-class`,
            },
          ],
        },
        {
          label: "Skills Plan",
          key: `/${role}/features/skills-plan`,
          children: [
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/features/skills-plan/create`}
                >
                  Create Skills Plan
                </Link>
              ),
              key: `/${role}/features/skills-plan/create`,
            },
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/features/skills-plan`}
                >
                  Skills Plan List
                </Link>
              ),
              key: `/${role}/features/skills-plan`,
            },
          ],
        },
        {
          label: "Short Overview",
          key: `/${role}/features/short-overview`,
          children: [
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/features/short-overview/create`}
                >
                  Create Short Overview
                </Link>
              ),
              key: `/${role}/features/short-overview/create`,
            },
            {
              label: (
                <Link
                  onClick={() => (setCollapsed ? setCollapsed(false) : null)}
                  href={`/${role}/features/short-overview`}
                >
                  Short Overview List
                </Link>
              ),
              key: `/${role}/features/short-overview`,
            },
          ],
        },

      ],
    },
    {
      label: "Contact",
      key: "manage-contact",
      icon: <ContactsFilled />,
      children: [
        // {
        //   label: (
        //     <Link
        //       onClick={() => (setCollapsed ? setCollapsed(false) : null)}
        //       href={`/${role}/contact/create`}
        //     >
        //       Create Contact
        //     </Link>
        //   ),
        //   key: `/${role}/contact/create`,
        // },
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/contact`}
            >
              Contact List
            </Link>
          ),
          key: `/${role}/contact`,
        },
      ],
    },
  ];

  const studentSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // {
    //   label: (
    //     <Link
    //       onClick={() => (setCollapsed ? setCollapsed(false) : null)}
    //       href={`/${role}/booking`}
    //     >
    //       Booking History
    //     </Link>
    //   ),
    //   icon: <ThunderboltOutlined />,
    //   key: `/${role}/booking`,
    // },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/activeCourse`}
        >
          Courses List
        </Link>
      ),
      icon: <CalendarOutlined />,
      key: `/${role}/activeCourse`,
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/activePackage`}
        >
          Package List
        </Link>
      ),
      icon: <PiPackageDuotone />,
      key: `/${role}/activePackage`,
    },

    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/assignment`}
        >
          Assignment
        </Link>
      ),
      icon: <ContainerOutlined />,
      key: `/${role}/assignment`,
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/review`}
        >
          Review/Feedback History
        </Link>
      ),
      icon: <AccountBookFilled />,
      key: `/${role}/review`,
    },

    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/contact`}
        >
          Support and Help
        </Link>
      ),
      icon: <BorderOuterOutlined />,
      key: `/contact`,
    },
  ];
  const sellerSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    // {
    //   label: (
    //     <Link
    //       onClick={() => (setCollapsed ? setCollapsed(false) : null)}
    //       href={`/${role}/course_sell`}
    //     >
    //       Course sell
    //     </Link>
    //   ),
    //   icon: <ThunderboltOutlined />,
    //   key: `/${role}/course_sell`,
    // },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/package`}
        >
          Package
        </Link>
      ),
      icon: <ShoppingCartOutlined />,
      key: `/${role}/package`,
    },
    {
      label: "Students",
      key: "students",
      icon: <UserOutlined />,
      children: [
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/students/create`}
            >
              Create Student
            </Link>
          ),
          key: `/${role}/students/create`,
        },
        {
          label: (
            <Link
              onClick={() => (setCollapsed ? setCollapsed(false) : null)}
              href={`/${role}/students`}
            >
              Students List
            </Link>
          ),
          key: `${role}/students`,
        },
      ],
    },
    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/order`}
        >
          Order History
        </Link>
      ),
      icon: <AccountBookFilled />,
      key: `/${role}/order`,
    },

    {
      label: (
        <Link
          onClick={() => (setCollapsed ? setCollapsed(false) : null)}
          href={`/${role}/support`}
        >
          Support and Help
        </Link>
      ),
      icon: <BorderOuterOutlined />,
      key: `/${role}/support`,
    },
  ];

  if (role === USER_ROLE.TRAINER) return trainerSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else if (role === USER_ROLE.STUDENT) return studentSidebarItems;
  else if (role === USER_ROLE.SELLER) return sellerSidebarItems;
};
