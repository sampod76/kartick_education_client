import type { MenuProps } from "antd";
import Link from "next/link";
export const homeNavItems: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "1",
  },
  {
    label: <Link href="/contact">Contact</Link>,
    key: "2",
  },
  {
    label: <Link href="/course">About</Link>,
    key: "/About",
  },
  {
    label: <Link href="/dashboard">Dashboard</Link>,
    key: "/dashboard",
  },
];
