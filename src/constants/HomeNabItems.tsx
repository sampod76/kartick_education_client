import type { MenuProps } from "antd";
import Link from "next/link";

export const homeNavItems = (role: string | null): MenuProps["items"] => {

  const defaultNavItem = [
    {
      label: (
        <Link className="text-[20px]   font-bold capitalize" href="/">
          Home
        </Link>
      ),
      key: "1",
    },
    // {
    //   label: (
    //     <Link className="text-[20px]   font-bold capitalize" href="/subscription">
    //       subscription
    //     </Link>
    //   ),
    //   key: "/subscription",
    // },
    {
      label: (
        <Link className="text-[20px]   font-bold capitalize" href="/learning">
          Learning
        </Link>
      ),
      key: "/learning",
    },
    // {
    //   label: (
    //     <Link className="text-[20px]   font-bold capitalize" href="/">
    //       Assessment
    //     </Link>
    //   ),
    //   key: "/assessment",
    // },
    // {
    //   label: (
    //     <Link className="text-[20px]   font-bold capitalize" href="/">
    //       Analysis
    //     </Link>
    //   ),
    //   key: "/analytics",
    // },

    {
      label: (
        <Link className="text-[20px]   font-bold capitalize" href="/contact">
          Contacts
        </Link>
      ),
      key: "/contact",
    },
    {
      label: (
        <Link className="text-[20px]   font-bold capitalize" href="/about">
          About
        </Link>
      ),

      key: "/About",
    },
  ]

  const loginUserNavItem = [
    ...defaultNavItem,
    {
      label: (
        <Link className="text-[20px]   font-bold capitalize" href="/analytics">
          Analytics
        </Link>
      ),
      key: "/analytics",
    },

  ]
  if (role) {
    return loginUserNavItem
  }
  else {
    return defaultNavItem
  }
}
export const homeNavItem: MenuProps["items"] =
  [
    {
      label: (
        <Link className="text-[20px]   font-bold capitalize" href="/">
          Home
        </Link>
      ),
      key: "1",
    },
    // {
    //   label: (
    //     <Link className="text-[20px]   font-bold capitalize" href="/subscription">
    //       subscription
    //     </Link>
    //   ),
    //   key: "/subscription",
    // },
    {
      label: (
        <Link className="text-[20px]   font-bold capitalize" href="/learning">
          Learning
        </Link>
      ),
      key: "/learning",
    },
    // {
    //   label: (
    //     <Link className="text-[20px]   font-bold capitalize" href="/">
    //       Assessment
    //     </Link>
    //   ),
    //   key: "/assessment",
    // },
    // {
    //   label: (
    //     <Link className="text-[20px]   font-bold capitalize" href="/">
    //       Analysis
    //     </Link>
    //   ),
    //   key: "/analytics",
    // },

    {
      label: (
        <Link className="text-[20px]   font-bold capitalize" href="/contact">
          Contacts
        </Link>
      ),
      key: "/contact",
    },
    {
      label: (
        <Link className="text-[20px]   font-bold capitalize" href="/course">
          About
        </Link>
      ),

      key: "/About",
    },
  ];
