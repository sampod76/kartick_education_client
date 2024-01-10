import type { MenuProps } from "antd";
import Link from "next/link";
export const homeNavItems: MenuProps["items"] = [
  {
    label: <Link className="text-base font-thin font-serif" href="/">Home</Link>,
    key: "1",
  },
  {

    label: <Link className="text-base font-thin font-serif"   href="/learning">Learning</Link>,
    key: "/learning",
  },
  {
    label: <Link className="text-base font-thin font-serif"   href="/">Assessment</Link>,
    key: "/assessment",
  },
  {
    label: <Link className="text-base font-thin font-serif"   href="/">Analysis</Link>,
    key: "/analysis",
  },
  {

    label: <Link className="text-base font-thin font-serif"   href="/contact">Contacts</Link>,
    key: "/contact",
  },
  {
    label: <Link  className="text-base font-thin font-serif" href="/course">About</Link>,

    key: "/About",
  }
];
