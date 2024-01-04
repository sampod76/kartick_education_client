"use client";
import StepperForm from "@/components/StepperForm/StepperForm";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

import { message } from "antd";
import StudentBasicInfo from "./StudentBasicInfo";
import StudentPersonalInfo from "./StudentPersonalInfo";
import StudentOtherInfo from "./StudentOtherInfo";
import HeadingUI from "../ui/dashboardUI/HeadingUI";

const CreateStudentPage = () => {
  //   const [addStudentWithFormData] = useAddStudentWithFormDataMutation();
  const steps = [
    {
      title: "Basic Information",
      content: <StudentBasicInfo />,
    },
    {
      title: "Personal Information",
      content: <StudentPersonalInfo />,
    },
    {
      title: "Others Information",
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
    <div className="px-3 mt-2">
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "manage-student", link: `/${base}/manage-student` },
        ]}
      />
      <HeadingUI>Create Student</HeadingUI>

      <div className="mt-5">
        <StepperForm
          persistKey="student-create-form"
          submitHandler={(value) => {
            handleStudentSubmit(value);
          }}
          steps={steps}
        />
      </div>
    </div>
  );
};

export default CreateStudentPage;
