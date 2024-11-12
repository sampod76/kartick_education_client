import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";
const { Header: AntHeader } = Layout;

const Header = () => {
  const { setRefetch, userInfo } = useGlobalContext();
  const router = useRouter();

  const logOut = () => {
    localStorage.clear();
    setRefetch((c) => !c);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button
          onClick={logOut}
          style={{ color: "white" }}
          type="default"
          danger
        >
          <span className="text-white">Logout</span>
        </Button>
      ),
    },
  ];
  const role = userInfo?.role;
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <div>
          <Link href={"/"} className="text-lg underline-offset-8">
            Home
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: "0px 5px",
            }}
          >
            {role}
          </p>
          <Dropdown menu={{ items }}>
            <a>
              <Space wrap size={16}>
                <Avatar size="large" icon={<UserOutlined />} />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Row>
    </AntHeader>
  );
};

export default Header;
