import type { MenuProps } from "antd";
import {
  HomeOutlined,
  TabletOutlined,
  UserOutlined,
  ContactsFilled,
  ControlOutlined,
  EuroOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const homeSideItems = (onClose?: any) => {
  const homeSIdeItems: MenuProps["items"] = [
    {
      label: <Link onClick={onClose} href="/">Home</Link>,
      key: "1",
      icon: <HomeOutlined />,
    },
    {

      label: <Link className="text-base font-thin font-serif"   href="/learning">Learning</Link>,
      key: "/learning",
      icon: <TabletOutlined />,
    },
    {
      label: <Link className="text-base font-thin font-serif"   href="/">Assessment</Link>,
      key: "/assessment",
      icon: <ControlOutlined />,
    },
    {
      label: <Link className="text-base font-thin font-serif"   href="/">Analysis</Link>,
      key: "/analysis",
      icon: <EuroOutlined />,
    },
    {
      label: <Link className=" text-4xl" onClick={onClose} href="/services/web-development">Web Development</Link>,
      key: "1/services/web-development",
      icon: <TabletOutlined />,
      children: [
        {
          label: (
            <Link onClick={onClose} href="/services/web-development/frontend">Frontend</Link>
          ),
          key: "1/services/web-development/frontend",
        },
        {
          label: <Link onClick={onClose} href="/services/web-development/backend">backend</Link>,
          key: "b/services/web-development/backend",
          children: [
            {
              label: (
                <Link onClick={onClose} href="b/services/web-development/backend/node-js">
                  Node JS
                </Link>
              ),
              key: "b/services/web-development/backend/node-js",
            },
          ],
        },
      ],
    },
    {
      label: <Link onClick={onClose} href="/services/math">Mathematics Academy</Link>,
      key: "1/services/math",
      icon: <ControlOutlined />,
      children: [
        {
          label: <Link onClick={onClose} href="/services/math/kinderOne">Elementory Math</Link>,
          key: "1/services/math/kinderOne",
          children: [
            {
              label: <Link onClick={onClose} href="/services/math/kinderOne">Math Kinder 1</Link>,
              key: "1/services/math/kinderOne",
              children: [
                {
                  label: (
                    <Link onClick={onClose} href="/services/math/kinderOne/lavel1">
                      Math Level 1
                    </Link>
                  ),
                  key: "services/math/kinderOne/lavel1",
                },
                {
                  label: (
                    <Link onClick={onClose} href="/services/math/kinderOne/lavel2">
                      Math Level 2
                    </Link>
                  ),
                  key: "services/math/kinderOne/lavel2",
                },
              ],
            },
            {
              label: <Link onClick={onClose} href="/services/math/kinderTwo">Math Kinder 1</Link>,
              key: "1/services/math/kinderTwo",
              children: [
                {
                  label: (
                    <Link onClick={onClose} href="/services/math/kinderTwo/lavel1">
                      Math Level 1
                    </Link>
                  ),
                  key: "services/math/kinderTwo/lavel1",
                },
                {
                  label: (
                    <Link onClick={onClose} href="/services/math/kinderTwo/lavel2">
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
      label: <Link onClick={onClose} href="/services/Physics">Physics Academy</Link>,
      key: "1/services/Physics",
      icon: <TabletOutlined />,
      children: [
        {
          label: (
            <Link onClick={onClose} href="/services/Physics/kinderOne">Elementary Physics</Link>
          ),
          key: "1/services/Physics/kinderOne",
          children: [
            {
              label: (
                <Link onClick={onClose} href="/services/Physics/kinderOne">Physics Kinder 1</Link>
              ),
              key: "1/services/Physics/kinderOne",
              children: [
                {
                  label: (
                    <Link onClick={onClose} href="/services/Physics/kinderOne/lavel1">
                      Physics Level 1
                    </Link>
                  ),
                  key: "services/Physics/kinderOne/lavel1",
                },
                {
                  label: (
                    <Link onClick={onClose} href="/services/Physics/kinderOne/lavel2">
                      Physics Level 2
                    </Link>
                  ),
                  key: "services/Physics/kinderOne/lavel2",
                },
              ],
            },
            {
              label: (
                <Link onClick={onClose} href="/services/Physics/kinderTwo">Physics Kinder 1</Link>
              ),
              key: "1/services/Physics/kinderTwo",
              children: [
                {
                  label: (
                    <Link onClick={onClose} href="/services/Physics/kinderTwo/lavel1">
                      Physics Level 1
                    </Link>
                  ),
                  key: "services/Physics/kinderTwo/lavel1",
                },
                {
                  label: (
                    <Link onClick={onClose} href="/services/Physics/kinderTwo/lavel2">
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
      label: <Link onClick={onClose} href="/services/Skills">Skills Academy</Link>,
      key: "1/services/Skills",
      icon: <EuroOutlined />,
      children: [
        {
          label: (
            <Link onClick={onClose} href="/services/Skills/kinderOne">Elementary Skills</Link>
          ),
          key: "1/services/Skills/kinderOne",
          children: [
            {
              label: (
                <Link onClick={onClose} href="/services/Skills/kinderOne">Skills Kinder 1</Link>
              ),
              key: "1/services/Skills/kinderOne",
              children: [
                {
                  label: (
                    <Link onClick={onClose} href="/services/Skills/kinderOne/lavel1">
                      Skills Level 1
                    </Link>
                  ),
                  key: "services/Skills/kinderOne/lavel1",
                },
                {
                  label: (
                    <Link onClick={onClose} href="/services/Skills/kinderOne/lavel2">
                      Skills Level 2
                    </Link>
                  ),
                  key: "services/Skills/kinderOne/lavel2",
                },
              ],
            },
            {
              label: (
                <Link onClick={onClose} href="/services/Skills/kinderTwo">Skills Kinder 1</Link>
              ),
              key: "1/services/Skills/kinderTwo",
              children: [
                {
                  label: (
                    <Link onClick={onClose} href="/services/Skills/kinderTwo/lavel1">
                      Skills Level 1
                    </Link>
                  ),
                  key: "services/Skills/kinderTwo/lavel1",
                },
                {
                  label: (
                    <Link onClick={onClose} href="/services/Skills/kinderTwo/lavel2">
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
      label: <Link onClick={onClose} href="/contact">Contact</Link>,
      key: "/contact",
      icon: <ContactsFilled />,
    },
    {
      label: <Link onClick={onClose} href="/">About</Link>,
      key: "/About",
      icon: <UserOutlined />,
    },
    {
      label: <Link onClick={onClose} href="/">Dashboard</Link>,
      key: "/dashboard",
    },
  ];

  return homeSIdeItems;
};

export default homeSideItems;
