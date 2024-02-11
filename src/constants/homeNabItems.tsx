import type { MenuProps } from "antd";
import Link from "next/link";
export const homeNavItems: MenuProps["items"] = [
  {
    label: (
      <Link className="text-base font-thin font-serif capitalize" href="/">
        Home
      </Link>
    ),
    key: "1",
  },
  {
    label: (
      <Link className="text-base font-thin font-serif capitalize" href="/subscription">
        subscription
      </Link>
    ),
    key: "/subscription",
  },
  {
    label: (
      <Link className="text-base font-thin font-serif capitalize" href="/learning">
        Learning
      </Link>
    ),
    key: "/learning",
  },
  // {
  //   label: (
  //     <Link className="text-base font-thin font-serif capitalize" href="/">
  //       Assessment
  //     </Link>
  //   ),
  //   key: "/assessment",
  // },
  // {
  //   label: (
  //     <Link className="text-base font-thin font-serif capitalize" href="/">
  //       Analysis
  //     </Link>
  //   ),
  //   key: "/analysis",
  // },
  
  {
    label: (
      <Link className="text-base font-thin font-serif capitalize" href="/contact">
        Contacts
      </Link>
    ),
    key: "/contact",
  },
  {
    label: (
      <Link className="text-base font-thin font-serif capitalize" href="/course">
        About
      </Link>
    ),

    key: "/About",
  },
];
