import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const SuperAdminPage = () => {
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "super_admin",
            link: "/super_admin",
          },
        ]}
      />
      <h1 className="text-base font-normal">This page is for super admin</h1>
    </div>
  );
};

export default SuperAdminPage;
