"use client";
import React, { useState } from "react";
import Form from "../Forms/Form";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import ButtonLoading from "../ui/Loading/ButtonLoading";
import ButtonSubmitUI from "../ui/ButtonSubmitUI";
import {
  useAddGlossaryMutation,
  useGetAllGlossaryQuery,
  useUpdateGlossaryMutation,
} from "@/redux/api/adminApi/glossaryApi";
import dynamic from "next/dynamic";
import SelectModuleField from "../Forms/SelectData/SelectModuleField";
import { Button } from "antd";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { ENUM_STATUS, ENUM_YN } from "@/constants/globalEnums";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
const TextEditor = dynamic(() => import("../shared/TextEditor/TextEditor"), {
  ssr: false,
});
export default function GlossaryCreate({ setOpen, moduleId }: any) {
  const [isReset, setIsReset] = useState(false);
  const { data, isLoading: GlossaryLoading } = useGetAllGlossaryQuery({
    module: moduleId,
    isDelete: ENUM_YN.NO,
    // status: ENUM_STATUS.ACTIVE,
  });
  console.log("🚀 ~ GlossaryCreate ~ data:", data);
  const glossary = data?.data[0];
  const [addGlossary, { isLoading }] = useAddGlossaryMutation();
  const [updateGlossary, { isLoading: glossaryUpdateLoading }] =
    useUpdateGlossaryMutation();
  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
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
      let res;
      if (!glossary) {
        res = await addGlossary(glossaryData).unwrap();
      } else {
        res = await updateGlossary({
          id: glossary?._id,
          data: glossaryData,
        }).unwrap();
      }

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model(
          `Successfully ${glossary ? "Update" : "Create"} Glossary`
        );
        setOpen(false);
        setIsReset(true);
      }
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };
  if (GlossaryLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <Form submitHandler={onSubmit} isReset={isReset}>
      {/* <div className="">
        <SelectModuleField />
      </div> */}

      <TextEditor
        defaultTextEditorValue={data?.data[0]?.details}
        isReset={isReset}
      />
      <div className="w-fit mx-auto">
        {isLoading || glossaryUpdateLoading ? (
          <ButtonLoading />
        ) : (
          <Button type="default" style={{ margin: "1rem" }} htmlType="submit">
            {glossary ? "Update glossary" : "Create Glossary"}
          </Button>
        )}
      </div>
    </Form>
  );
}
