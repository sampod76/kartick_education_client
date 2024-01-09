import React from "react";

import Form from "../Forms/Form";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import ButtonLoading from "../ui/Loading/ButtonLoading";
import ButtonSubmitUI from "../ui/ButtonSubmitUI";
import { useAddGlossaryMutation } from "@/redux/api/adminApi/glossary";
import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("../shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);
export default function GlossaryCreate({setOpen,moduleId}:any) {
  const [addGlossary, { isLoading }] = useAddGlossaryMutation();
  const onSubmit = async (values: any) => {
    console.log("🚀 ~ file: page.tsx:77 ~ onSubmit ~ values:", values);
    if (!moduleId) {
      Error_model_hook("Please ensure your are selected moduleId");
      return;
    }
    const resourceData: {} = {
      ...values,
      module: moduleId,
    };
    // return;
    try {
      const res = await addGlossary(resourceData).unwrap();
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Resource");
        setOpen(false);
      }
    } catch (error: any) {
      Error_model_hook(error?.data);
      console.log(error);
    }
  };
  return (
    <Form submitHandler={onSubmit}>
      <TextEditor />
      <div className="w-fit mx-auto">
        {isLoading ? (
          <ButtonLoading />
        ) : (
          <ButtonSubmitUI>Create Resource</ButtonSubmitUI>
        )}
      </div>
    </Form>
  );
}
