'use client';
import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi';
import AdminDashboardMain from '@/components/dashboard/admin/AdminDashboardMain';
import SellerDashboardMain from '@/components/dashboard/seller/SellerDashboardMain';

import StudentDashboardMain from '@/components/dashboard/student/StudentDashboardMain';

const DashboardPage = () => {
  const { userInfo } = useGlobalContext();

  if (userInfo?.role == 'admin') {
    return <AdminDashboardMain />;
  } else if (userInfo?.role == 'seller') {
    return <SellerDashboardMain />;
  } else {
    return <StudentDashboardMain />;
  }
};

export default DashboardPage;

// export default dynamic(() => Promise.resolve(DashboardPage), {
//   ssr: false,
// });
