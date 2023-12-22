import DropDownUI from "@/components/ui/NavUI/DropDownUI";
import { dropDownItemsData } from "@/db/publicNavDB";
import type { MenuProps } from "antd";
import Link from "next/link";
export const homeNavItems: MenuProps["items"] = [
  {
    label: "Home",

    key: `/Home`,
  },
  {
    label: "WEB",
    key: "1/WEB",
    children: [
      {
        label: "Web Development",
        key: "1/services/web-development",
        children: [
          {
            label: "Frontend",
            key: "1/services/web-development/frontend",
          },
          {
            label: "Backend",
            key: "1/services/web-development/backend",
            children: [
              {
                label: "Node.js",
                key: "1/services/web-development/backend/node-js",
              },
              {
                label: "Express.js",
                key: "1/services/web-development/backend/express-js",
              },
            ],
          },
        ],
      },
      {
        label: "Graphic Design",
        key: "1/services/graphic-design",
      },
      {
        label: "Digital Marketing",
        key: "1/services/digital-marketing",
      },
    ],
  },
  {
    label: "ELEMENTARY MATH",
    key: "2/ELEMENTARY MATH",
    children: [
      {
        label: "Web Development",
        key: "2/services/web-development",
        children: [
          {
            label: "Frontend",
            key: "2/services/web-development/frontend",
          },
          {
            label: "Backend",
            key: "2/services/web-development/backend",
            children: [
              {
                label: "Node.js",
                key: "2/services/web-development/backend/node-js",
              },
              {
                label: "Express.js",
                key: "2/services/web-development/backend/express-js",
              },
            ],
          },
        ],
      },
      {
        label: "Graphic Design",
        key: "2/services/graphic-design",
      },
      {
        label: "Digital Marketing",
        key: "2/services/digital-marketing",
      },
    ],
  },
  {
    key: "Learning",
    label: "Learning",
    children: [
      {
        label: "ELEMENTARY MATH",
        key: "3/ELEMENTARY MATH",
        children: [
          {
            label: "Web Development",
            key: "3/services/web-development",
            children: [
              {
                label: "Frontend",
                key: "3/services/web-development/frontend",
              },
              {
                label: "Backend",
                key: "3/services/web-development/backend",
                children: [
                  {
                    label: "Node.js",
                    key: "3/services/web-development/backend/node-js",
                  },
                  {
                    label: "Express.js",
                    key: "3/services/web-development/backend/express-js",
                  },
                ],
              },
            ],
          },
          {
            label: "Graphic Design",
            key: "3/services/graphic-design",
          },
          {
            label: "Digital Marketing",
            key: "3/services/digital-marketing",
          },
        ],
      },
    ],
  },
  {
    key: "assessment",
    // label: <Link href="/">Assetment</Link>,
    label: "Assessment",
  },
  {
    key: "analysis",
    label: "Analysis",
  },
];
