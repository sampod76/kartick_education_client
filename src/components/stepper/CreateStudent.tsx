"use client";
import StepperForm from "@/components/StepperForm/StepperForm";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

import StudentBasicInfo from "./StudentBasicInfo";
import StudentPersonalInfo from "./StudentPersonalInfo";

import HeadingUI from "../ui/dashboardUI/HeadingUI";

import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { useAddStudentWithFormDataMutation } from "@/redux/api/adminApi/studentApi";

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
  ];
  const [addStudentWithFormData, { isLoading }] =
    useAddStudentWithFormDataMutation();

  const handleStudentSubmit = async (values: any) => {
    const { password, ...others } = values;
    const studentData = {
      password: values.password,
      student: others,
    };
    // console.log(
    //   "🚀 ~ file: CreateStudent.tsx:34 ~ handleStudentSubmit ~ studentData:",
    //   studentData
    // );

    try {
      const res = await addStudentWithFormData(studentData).unwrap();
      console.log(res, "response");
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Student created successfully");
      }
      // message.success("Admin created successfully!");
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data);
    }
  };

  const base = "super_admin";
  return (
    <div className="px-3 bg-slate-200 h-auto lg:min-h-screen py-2">
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "manage-student", link: `/${base}/manage-student` },
        ]}
      />

      <div className="mt-5 w-full lg:max-w-7xl mx-auto shadow-xl py-7 px-5 bg-white rounded-md">
        <HeadingUI>Sign Up </HeadingUI>
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
