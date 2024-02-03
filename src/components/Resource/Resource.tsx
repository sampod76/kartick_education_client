"use client";
import React, { useState } from "react";
// import TextEditor from "../shared/TextEditor/TextEditor";
import Form from "../Forms/Form";
import { Error_model_hook, Success_model } from "@/utils/modalHook";
import {
  useAddResourceMutation,
  useUpdateResourceMutation,
} from "@/redux/api/adminApi/resourceApi";
import ButtonLoading from "../ui/Loading/ButtonLoading";
import ButtonSubmitUI from "../ui/ButtonSubmitUI";
import dynamic from "next/dynamic";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { useGetAllRatingFeedbackQuery } from "@/redux/api/ratingFeedback";
import { ENUM_YN } from "@/constants/globalEnums";
import LoadingSkeleton from "../ui/Loading/LoadingSkeleton";
const TextEditor = dynamic(() => import("../shared/TextEditor/TextEditor"), {
  ssr: false,
});

export default function ResourceCreate({
  setOpen,
  moduleId,
}: {
  moduleId: string;
  setOpen?: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [isReset, setIsReset] = useState(false);
  const [addResource, { isLoading }] = useAddResourceMutation();
  const [updateResource, { isLoading: updateLoading }] =
    useUpdateResourceMutation();
  const { data, isLoading: GetLoading } = useGetAllRatingFeedbackQuery({
    module: moduleId,
    isDelete: ENUM_YN.NO,
    // status: ENUM_STATUS.ACTIVE,
  });
  const resource = data?.data[0];
  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);

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
      let res;
      if (!resource) {
        res = await addResource(resourceData).unwrap();
      } else {
        res = await updateResource(resourceData).unwrap();
      }
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model(`Successfully ${resource ? "Update" : "added"} Resource`);
        // if (setOpen) {
        //   setOpen(false);
        // }
        setIsReset(true);
      }
    } catch (error: any) {
      Error_model_hook(error?.message);
      console.log(error);
    }
  };

  if (GetLoading) {
    return <LoadingSkeleton />;
  }
  return (
    <Form submitHandler={onSubmit}>
      <TextEditor isReset={isReset} />
      <div className="w-fit mx-auto">
        {isLoading ? (
          <ButtonLoading />
        ) : (
          <ButtonSubmitUI>
            {resource ? "Update" : "Create Resource"}
          </ButtonSubmitUI>
        )}
      </div>
    </Form>
  );
}
