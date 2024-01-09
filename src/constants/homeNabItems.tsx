import type { MenuProps } from "antd";
import Link from "next/link";
export const homeNavItems: MenuProps["items"] = [
  {
    label: <Link className="text-base font-thin font-serif" href="/">Home</Link>,
    key: "1",
  },
 

  {

    label: <Link className="text-base font-thin font-serif"   href="/course">Contact</Link>,
    key: "/contact",
  },
  {
    label: <Link  className="text-base font-thin font-serif" href="/course">About</Link>,

    key: "/About",
  },
  {
    label: <Link className="text-base font-thin font-serif"  href="/dashboard">Dashboard</Link>,
    key: "/dashboard",
  },
];
