"use client";
import StepperForm from "@/components/StepperForm/StepperForm";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

import { message } from "antd";
import StudentBasicInfo from "./StudentBasicInfo";
import StudentPersonalInfo from "./StudentPersonalInfo";
import StudentOtherInfo from "./StudentOtherInfo";

const CreateStudentPage = () => {
  //   const [addStudentWithFormData] = useAddStudentWithFormDataMutation();
  const steps = [
    {
      title: "Basic Information",
      content: <StudentBasicInfo />,
    },
    {
      title: "Guardian Information",
      content: <StudentPersonalInfo />,
    },
    {
      title: "Student Others Information",
      content: <StudentOtherInfo />,
    },
  ];

  const handleStudentSubmit = async (values: any) => {
    const obj = { ...values };
    const file = obj["file"];
    delete obj["file"];
    const data = JSON.stringify(obj);
    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("data", data);
    message.loading("Creating...");
    try {
      //   const res = await addStudentWithFormData(formData);
      //   if (!!res) {
      //     message.success("Student created successfully!");
      //   }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  const base = "super_admin";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "manage-student", link: `/${base}/manage-student` },
        ]}
      />
      <h1 style={{ margin: "10px 0px" }}>Create Student</h1>
      <StepperForm
        persistKey="student-create-form"
        submitHandler={(value) => {
          handleStudentSubmit(value);
        }}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
