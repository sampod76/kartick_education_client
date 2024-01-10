"use client";
import React, { useState } from "react";
import Form from "../Forms/Form";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import ButtonLoading from "../ui/Loading/ButtonLoading";
import ButtonSubmitUI from "../ui/ButtonSubmitUI";
import { useAddGlossaryMutation } from "@/redux/api/adminApi/glossaryApi";
import dynamic from "next/dynamic";
import SelectModuleField from "../Forms/SelectData/SelectModuleField";
import { Button } from "antd";
const TextEditor = dynamic(() => import("../shared/TextEditor/TextEditor"), {
  ssr: false,
});
export default function GlossaryCreate({ setOpen, moduleId }: any) {
  const [isReset, setIsReset] = useState(false);

  const [addGlossary, { isLoading }] = useAddGlossaryMutation();
  const onSubmit = async (values: any) => {
    console.log("🚀 ~ file: page.tsx:77 ~ onSubmit ~ values:", values);
    if (!moduleId) {
      Error_model_hook("Please ensure your are selected moduleId");
      return;
    }
    const glossaryData: {} = {
      ...values,
      module: moduleId,
    };

    try {
      const res = await addGlossary(glossaryData).unwrap();
      if (res.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("Successfully Added Glossary");
        setOpen(false);
        setIsReset(true);
      }
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };
  return (
    <Form submitHandler={onSubmit} isReset={isReset}>
      {/* <div className="">
        <SelectModuleField />
      </div> */}

      <TextEditor />
      <div className="w-fit mx-auto">
        {isLoading ? (
          <ButtonLoading />
        ) : (
          <Button type="default" style={{margin:"1rem"}} htmlType="submit">Create Glossary</Button>
        )}
      </div>
    </Form>
  );
}
