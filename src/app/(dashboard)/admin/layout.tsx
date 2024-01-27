"use client";
import Contents from "@/components/ui/Contents";
import SideBar from "@/components/ui/Sidebar";
import { USER_ROLE } from "@/constants/role";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { Drawer, Layout, Menu, Row, Space, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { dashboardItems } from "@/constants/dashBoardItems";
import DashboardSidebar from "@/components/shared/DashBoard/DashboardSidebar";
import DashboardNavBar from "@/components/shared/DashBoard/DashboardNavbar";
import dynamic from "next/dynamic";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const userLoggedIn = isLoggedIn();
  // const [userInfo, setUserInfo] = useState<any>({
  //   loading: true,
  //   data: { email: "", id: "", role: "" },
  // });
  const userInfo =getUserInfo() as any;

  // useEffect(() => {
  //   // Fetch user info asynchronously on the client side
  
  //   const fetchUserInfo = async () => {
  //     const userInfo = (await getUserInfo()) as any;
  //     setUserInfo((c: any) => ({ ...c, ...userInfo }));
  //   };
  //   fetchUserInfo();
  //   setUserInfo({loading:false})
  // }, []);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  useEffect(() => {
    if (!userInfo?.role) {
      router.push("/login");
    } else if (userInfo?.role !== USER_ROLE.ADMIN) {
      router.back();
    }
    setIsLoading(false);
  }, [router, isLoading, userLoggedIn, userInfo?.role]);

  if (isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin size="large"></Spin>
        </Space>
      </Row>
    );
  }

  return <>{children}</>;
};

export default AdminLayout;

// export default dynamic(() => Promise.resolve(AdminLayout), {
//   ssr: false,
// });

// "use client";
// import Contents from "@/components/ui/Contents";
// import SideBar from "@/components/ui/Sidebar";
// import { USER_ROLE } from "@/constants/role";
// import { getUserInfo, isLoggedIn } from "@/services/auth.service";
// import { Drawer, Layout, Menu, Row, Space, Spin } from "antd";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
// import { dashboardItems } from "@/constants/dashBoardItems";
// import DashboardSidebar from "@/components/shared/DashBoard/DashboardSidebar";
// import DashboardNavBar from "@/components/shared/DashBoard/DashboardNavbar";
// import dynamic from "next/dynamic";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { useGetProfileQuery } from "@/redux/api/auth/authApi";
// import { setUserRole } from "@/redux/features/user/userRoleSlice";

// const { Content } = Layout;

// const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
//   const {
//     data,
//     isLoading: profileLoading,
//     error,
//     isSuccess,
//   } = useGetProfileQuery({});

//   // const userLoggedIn = isLoggedIn();
//   // const userLoggedIn = USER_ROLE.ADMIN;
//   const dispatch = useAppDispatch();
//   const {
//     data: userData,
//     isLoading,
//     isError,
//   } = useAppSelector((state) => state.userInfo);
//   console.log("🚀 ~ DashboardLayout ~ userData:", userData, isLoading);
//   // console.log(userInfo);
//   const router = useRouter();
//   // const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [collapsed, setCollapsed] = useState(false);

//   const screens = useBreakpoint();

//   // useEffect(() => {
//   //   if (!profileLoading) {
//   //     if (!data?._id) {
//   //       router.push("/login");
//   //     }
//   //   }
//   // }, [data?._id, profileLoading, router]);

//   // console.log(
//   //   "data",
//   //   data,
//   //   "profileLoading",
//   //   profileLoading,
//   //   "error",
//   //   error,
//   //   "isSuccess",
//   //   isSuccess
//   // );

//   if (isSuccess && data?._id) {
//     const { _id, role } = data;
//     if (!userData?._id)
//       console.log("isSuccess", isSuccess, "🚀 ~ DashboardLayout ~ data:", data);

//     dispatch(
//       setUserRole({
//         data: { ...data[data.role], _id, role },
//         isLoading: false,
//       })
//     );
//   }

//   // const { data: userStateData } = useAppSelector(state => state.userInfo)
//   // console.log('userStateData', userStateData)
//   if (profileLoading) {
//     dispatch(
//       setUserRole({
//         isLoading: true,
//         data: {
//           role: "",
//           name: "",
//           email: "",
//           img: "",
//           _id: "",
//         },
//       })
//     );
//     return (
//       <Row
//         justify="center"
//         align="middle"
//         style={{
//           height: "100vh",
//         }}
//       >
//         <Space>
//           <Spin size="large"></Spin>
//         </Space>
//       </Row>
//     );
//   }

//   if (error) {
//     console.error("Error fetching user profile:", error);
//     router.push("/login");
//     return null; // or display an error message
//   }

//   if (!isSuccess || !data?._id) {
//     // Handle the case where the user is not logged in or the profile is not available
//     router.push("/login");
//     return null; // or display a login prompt
//   }

//   return (
//     <Layout
//       hasSider
//       style={{ display: "flex", justifyContent: "space-between" }}
//     >
//       {!screens.sm ? (
//         <Drawer
//           title={`${userData?.role} Dash`}
//           placement="left"
//           onClose={() => setCollapsed(false)}
//           open={collapsed}
//           style={{
//             width: 350,
//           }}
//         >
//           <Menu
//             // className="bg-white"
//             style={{ backgroundColor: "#222222" }}
//             defaultSelectedKeys={["1"]}
//             mode="inline"
//             items={dashboardItems(userData?.role, setCollapsed)}
//           />
//         </Drawer>
//       ) : (
//         <section>
//           <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
//         </section>
//       )}

//       <Layout style={{ overflow: "hidden" }}>
//         <DashboardNavBar collapsed={collapsed} setCollapsed={setCollapsed} />
//         <Content
//           style={{
//             padding: "1em",
//             minHeight: "100vh",
//             overflowY: "initial",
//             // textAlign: "center",
//           }}
//         >
//           {children}
//         </Content>
//         {/* <Footer></Footer> */}
//       </Layout>
//     </Layout>
//   );
// };

// // export default DashboardLayout;

// export default dynamic(() => Promise.resolve(DashboardLayout), {
//   ssr: false,
// });
