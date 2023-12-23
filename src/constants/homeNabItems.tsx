import DropDownUI from "@/components/ui/NavUI/DropDownUI";
import { dropDownItemsData } from "@/db/publicNavDB";
import type { MenuProps } from "antd";
import Link from "next/link";
export const homeNavItems: MenuProps["items"] = [
  {
    label: <Link href="/">Home</Link>,
    key: "1",
  },
  {
    label: <Link href="/services/web-development">Web Development</Link>,
    key: "1/services/web-development",
    children: [
      {
        label: <Link href="/services/web-development/frontend">Frontend</Link>,
        key: "1/services/web-development/frontend",
      },
      {
        label: <Link href="/services/web-development/backend">backend</Link>,
        key: "1/services/web-development/backend",
        children: [
          {
            label: (
              <Link href="/services/web-development/backend/node-js">
               Node.js
              </Link>
            ),
            key: "1/services/web-development/backend/node-js",
          },
        ],
      },
    ],
  },
  {
    label: <Link href="/services/math">Mathematics Academy</Link>,
    key: "1/services/math",
    children: [
      {
        label: <Link href="/services/math/kinderOne">Elementory Math</Link>,
        key: "1/services/math/kinderOne",
        children: [
          {
            label: <Link href="/services/math/kinderOne">Math Kinder 1</Link>,
            key: "1/services/math/kinderOne",
            children: [
              {
                label: (
                  <Link href="/services/math/kinderOne/lavel1">
                    Math Level 1
                  </Link>
                ),
                key: "services/math/kinderOne/lavel1",
              },
              {
                label: (
                  <Link href="/services/math/kinderOne/lavel2">
                    Math Level 2
                  </Link>
                ),
                key: "services/math/kinderOne/lavel2",
              },
            ],
          },
          {
            label: <Link href="/services/math/kinderTwo">Math Kinder 1</Link>,
            key: "1/services/math/kinderTwo",
            children: [
              {
                label: (
                  <Link href="/services/math/kinderTwo/lavel1">
                    Math Level 1
                  </Link>
                ),
                key: "services/math/kinderTwo/lavel1",
              },
              {
                label: (
                  <Link href="/services/math/kinderTwo/lavel2">
                    Math Level 2
                  </Link>
                ),
                key: "services/math/kinderTwo/lavel2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: <Link href="/services/Physics">Physics Academy</Link>,
    key: "1/services/Physics",
    children: [
      {
        label: <Link href="/services/Physics/kinderOne">Elementary Physics</Link>,
        key: "1/services/Physics/kinderOne",
        children: [
          {
            label: <Link href="/services/Physics/kinderOne">Physics Kinder 1</Link>,
            key: "1/services/Physics/kinderOne",
            children: [
              {
                label: (
                  <Link href="/services/Physics/kinderOne/lavel1">
                    Physics Level 1
                  </Link>
                ),
                key: "services/Physics/kinderOne/lavel1",
              },
              {
                label: (
                  <Link href="/services/Physics/kinderOne/lavel2">
                    Physics Level 2
                  </Link>
                ),
                key: "services/Physics/kinderOne/lavel2",
              },
            ],
          },
          {
            label: <Link href="/services/Physics/kinderTwo">Physics Kinder 1</Link>,
            key: "1/services/Physics/kinderTwo",
            children: [
              {
                label: (
                  <Link href="/services/Physics/kinderTwo/lavel1">
                    Physics Level 1
                  </Link>
                ),
                key: "services/Physics/kinderTwo/lavel1",
              },
              {
                label: (
                  <Link href="/services/Physics/kinderTwo/lavel2">
                    Physics Level 2
                  </Link>
                ),
                key: "services/Physics/kinderTwo/lavel2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: <Link href="/services/Skills">Skills Academy</Link>,
    key: "1/services/Skills",
    children: [
      {
        label: <Link href="/services/Skills/kinderOne">Elementary Skills</Link>,
        key: "1/services/Skills/kinderOne",
        children: [
          {
            label: <Link href="/services/Skills/kinderOne">Skills Kinder 1</Link>,
            key: "1/services/Skills/kinderOne",
            children: [
              {
                label: (
                  <Link href="/services/Skills/kinderOne/lavel1">
                    Skills Level 1
                  </Link>
                ),
                key: "services/Skills/kinderOne/lavel1",
              },
              {
                label: (
                  <Link href="/services/Skills/kinderOne/lavel2">
                    Skills Level 2
                  </Link>
                ),
                key: "services/Skills/kinderOne/lavel2",
              },
            ],
          },
          {
            label: <Link href="/services/Skills/kinderTwo">Skills Kinder 1</Link>,
            key: "1/services/Skills/kinderTwo",
            children: [
              {
                label: (
                  <Link href="/services/Skills/kinderTwo/lavel1">
                    Skills Level 1
                  </Link>
                ),
                key: "services/Skills/kinderTwo/lavel1",
              },
              {
                label: (
                  <Link href="/services/Skills/kinderTwo/lavel2">
                    Skills Level 2
                  </Link>
                ),
                key: "services/Skills/kinderTwo/lavel2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: <Link href="/">Contact</Link>,
    key: "/contact",
  },
  {
    label: <Link href="/">About</Link>,
    key: "/About",
  },
  {
    label: <Link href="/admin/course">Dashboard</Link>,
    key: "/dashboard",
  },
];
