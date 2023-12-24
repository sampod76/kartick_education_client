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
    label: <Link href="/course">Web Development</Link>,
    key: "1/services/web-development",
    children: [
      {
        label: <Link href="/services/web-development/frontend">Frontend</Link>,
        key: "f/services/web-development/frontend",
      },
      {
        label: <Link href="/services/web-development/backend">backend</Link>,
        key: "b/services/web-development/backend",

        children: [
          {
            label: (
              <Link href="b/services/web-development/backend/node-js">
                Node.js
              </Link>
            ),
            key: "b/services/web-development/backend/node-js",
          },
        ],
      },
    ],
  },
  {
    label: <Link href="/course">Mathematics Academy</Link>,
    key: "1/Education/math",
    children: [
      {
        label: <Link href="/Education/math/kinderOne">Elementory Math</Link>,
        key: "1/Education/math/kinderOne",
        children: [
          {
            label: <Link href="/Education/math/kinderOne">Math Kinder 1</Link>,
            key: "1/Education/math/kinderOne",
            children: [
              {
                label: (
                  <Link href="/Education/math/kinderOne/lavel1">
                    Math Level 1
                  </Link>
                ),
                key: "Education/math/kinderOne/lavel1",
              },
              {
                label: (
                  <Link href="/Education/math/kinderOne/lavel2">
                    Math Level 2
                  </Link>
                ),
                key: "Education/math/kinderOne/lavel2",
              },
            ],
          },
          {
            label: <Link href="/Education/math/kinderTwo">Math Kinder 1</Link>,
            key: "1/Education/math/kinderTwo",
            children: [
              {
                label: (
                  <Link href="/Education/math/kinderTwo/lavel1">
                    Math Level 1
                  </Link>
                ),
                key: "Education/math/kinderTwo/lavel1",
              },
              {
                label: (
                  <Link href="/Education/math/kinderTwo/lavel2">
                    Math Level 2
                  </Link>
                ),
                key: "Education/math/kinderTwo/lavel2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: <Link href="/course">Physics Academy</Link>,
    key: "2/services/Physics",
    children: [
      {
        label: (
          <Link href="/science/Physics/kinderOne">Elementary Physics</Link>
        ),
        key: "2/science/Physics/kinderOne",
        children: [
          {
            label: (
              <Link href="/science/Physics/kinderOne">Physics Kinder 2</Link>
            ),
            key: "2/science/Physics/kinderOne",
            children: [
              {
                label: (
                  <Link href="/science/Physics/kinderOne/lavel2">
                    Physics Level 2
                  </Link>
                ),
                key: "science/Physics/kinderOne/lavel2",
              },
              {
                label: (
                  <Link href="/science/Physics/kinderOne/lavel2">
                    Physics Level 2
                  </Link>
                ),
                key: "science/Physics/kinderOne/lavel2",
              },
            ],
          },
          {
            label: (
              <Link href="/science/Physics/kinderTwo">Physics Kinder 2</Link>
            ),
            key: "2/science/Physics/kinderTwo",
            children: [
              {
                label: (
                  <Link href="/science/Physics/kinderTwo/lavel2">
                    Physics Level 2
                  </Link>
                ),
                key: "science/Physics/kinderTwo/lavel2",
              },
              {
                label: (
                  <Link href="/science/Physics/kinderTwo/lavel2">
                    Physics Level 2
                  </Link>
                ),
                key: "science/Physics/kinderTwo/lavel2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: <Link href="/course">Skills Academy</Link>,
    key: "3/sk/Skills",
    children: [
      {
        label: <Link href="/sk/Skills/kinderOne">Elementary Skills</Link>,
        key: "3/sk/Skills/kinderOne",
        children: [
          {
            label: <Link href="/sk/Skills/kinderOne">Skills Kinder 3</Link>,
            key: "3/sk/Skills/kinderOne",
            children: [
              {
                label: (
                  <Link href="/sk/Skills/kinderOne/lavel3">Skills Level 3</Link>
                ),
                key: "sk/Skills/kinderOne/lavel3",
              },
              {
                label: (
                  <Link href="/sk/Skills/kinderOne/lavel2">Skills Level 2</Link>
                ),
                key: "sk/Skills/kinderOne/lavel2",
              },
            ],
          },
          {
            label: <Link href="/sk/Skills/kinderTwo">Skills Kinder 3</Link>,
            key: "3/sk/Skills/kinderTwo",
            children: [
              {
                label: (
                  <Link href="/sk/Skills/kinderTwo/lavel3">Skills Level 3</Link>
                ),
                key: "sk/Skills/kinderTwo/lavel3",
              },
              {
                label: (
                  <Link href="/sk/Skills/kinderTwo/lavel2">Skills Level 2</Link>
                ),
                key: "sk/Skills/kinderTwo/lavel2",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: <Link href="/course">Contact</Link>,
    key: "/contact",
  },
  {
    label: <Link href="/course">About</Link>,
    key: "/About",
  },
  {
    label: <Link href="/course">Dashboard</Link>,
    key: "/dashboard",
  },
];
