import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const ManageUsersPage = () => {
  return (
    <div style={{
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      borderRadius: "1rem",
      backgroundColor: "white",
      padding: "1rem",
    }}>
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
