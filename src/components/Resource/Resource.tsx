'use client'
import React, { useState } from "react";
// import TextEditor from "../shared/TextEditor/TextEditor";
import Form from "../Forms/Form";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import { useAddResourceMutation } from "@/redux/api/adminApi/resource";
import ButtonLoading from "../ui/Loading/ButtonLoading";
import ButtonSubmitUI from "../ui/ButtonSubmitUI";
import dynamic from "next/dynamic";
const TextEditor = dynamic(
  () => import("../shared/TextEditor/TextEditor"),
  {
    ssr: false,
  }
);

export default function ResourceCreate({ setOpen, moduleId }: any) {
  const [isReset, setIsReset] = useState(false);
  const [addResource, { isLoading }] = useAddResourceMutation();
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
    console.log(resourceData);
    // return;
    try {
      const res = await addResource(resourceData).unwrap();
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully added Resource");
        setOpen(true);
        setIsReset(true);
      }
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };
  return (
    <Form submitHandler={onSubmit}>
      <TextEditor isReset={isReset}
          />
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
