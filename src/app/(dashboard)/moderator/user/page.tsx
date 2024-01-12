import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const ManageUsersPage = () => {
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
      <h1 className="text-base font-normal">User List</h1>
    </div>
  );
};

export default ManageUsersPage;
