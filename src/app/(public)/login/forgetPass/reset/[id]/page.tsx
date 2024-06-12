import { Form, Input, Button } from 'antd';
// import { useSearchParams } from 'react-router-dom'; // Assuming you're using React Router

export default function ResetPasswordPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params?.id;
  // const searchParams = useSearchParams();
  // const token = searchParams?.get("token");
  const [form] = Form.useForm();

  const onFinish = async (values:any) => {
    try {
      // Implement your logic for password reset here
      console.log(values); // Example: Logging the form values
      // Call your API or perform necessary actions for password reset
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">Reset Password</h1>
      <Form onFinish={onFinish} form={form}>
        <div className="mb-4">
          <h2 className="block text-gray-700 font-bold mb-2">Email Address</h2>
          <Form.Item name="oldPassword">
            <Input.Password
              name="oldPassword"
              type="password"
              className=""
              id="oldPassword"
              placeholder="Enter your Old Password address"
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                paddingLeft: "0.75rem",
                paddingRight: "0.75rem",
                borderRadius: "0.25rem",
                borderWidth: "1px",
                width: "100%",
                lineHeight: 1.25,
                color: "#374151",
                appearance: "none",
              }}
            />
          </Form.Item>
          <Form.Item name="newPassword">
            <Input.Password
              name="newPassword"
              type="password"
              className=""
              id="newPassword"
              placeholder="Enter your new Password address"
              style={{
                paddingTop: "0.5rem",
                paddingBottom: "0.5rem",
                paddingLeft: "0.75rem",
                paddingRight: "0.75rem",
                borderRadius: "0.25rem",
                borderWidth: "1px",
                width: "100%",
                lineHeight: 1.25,
                color: "#374151",
                appearance: "none",
              }}
            />
          </Form.Item>
        </div>
        <Button
          style={{
            padding: "",
            borderRadius: "9999px",
            width: "100%",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            fontWeight: 600,
            color: "#ffffff",
            backgroundColor: "#2563EB",
            height: "2.5rem",
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
          htmlType="submit"
        >
          Reset Password
        </Button>
      </Form>
    </div>
  );
}
