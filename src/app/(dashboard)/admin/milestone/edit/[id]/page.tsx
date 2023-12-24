"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";

import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectCourseField from "@/components/Forms/SelectData/SelectCourseField";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadImage from "@/components/ui/UploadImage";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";

import uploadImgBB from "@/hooks/imgbbUploads";

import {
  useGetSingleMilestoneQuery,
  useUpdateMilestoneMutation,
} from "@/redux/api/adminApi/milestoneApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, Select, message } from "antd";

import { useState } from "react";

const EditMilestonePage = ({ params }: any) => {
  const { data: MilestoneData, isLoading } = useGetSingleMilestoneQuery(
    params?.id,
    {
      skip: !Boolean(params?.id),
    }
  );
  console.log(MilestoneData);
  // const { data: MilestoneData = [] } = useGetAllCategoryQuery({});
  const [updateMilestone, { isLoading: updateLoading, error }] =
    useUpdateMilestoneMutation();

  // !  tag selection

  const [selectedTags, setSelectedTags] = useState(MilestoneData?.tags|| ["tech"]);

  const onSubmit = async (values: any) => {
    if (typeof values.img !== "string") {
      console.log(values);
      values.img = await uploadImgBB(values.img);
    }
    const UpdateValues = {
      tags: selectedTags,
      ...values,
    };

    console.log(UpdateValues);
    try {
      const res = await updateMilestone({
        id: params?.id,
        data: UpdateValues,
      }).unwrap();

      console.log(res);
      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("successfully updated data");
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  if (isLoading || updateLoading) {
    return <LoadingForDataFetch />;
  }
  if (error) {
    console.log(error);
  }

  console.log(MilestoneData);
  const defaultValues = {
    title: MilestoneData?.title || "",

    img: MilestoneData?.img || "",

    status: MilestoneData?.status || "",
    details: MilestoneData?.details || "",

    // managementDepartment: MilestoneData?.managementDepartment?.id || "",
  };
  console.log(defaultValues);

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(ICategorySchema)} */}
        <HeadingUI>Update  Milestone</HeadingUI>
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          
        <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
            }}
          >
            <HeadingUI>Create Milestone</HeadingUI>
            <Row gutter={[12, 12]}>
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Milestone Title"
                  required={true}
                />
              </Col>

              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectAuthorField />
                {/* //! price type 8 */}
              </Col>
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectCourseField />
                {/* //! price type 8 */}
              </Col>
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <TagsSelectUI selected={selectedTags} setSelected={setSelectedTags} />
                {/*//! 11 */}
              </Col>
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <UploadImage name="img" />
              </Col>
              <Col
                className="gutter-row"
                xs={24}
                // md={12}
                // lg={8}
                style={{}}
              >
                {/*//! 3 */}
                <FormTextArea label="Description" rows={15} name="details" />
              </Col>
            </Row>
          </div>
            <ButtonSubmitUI>Update Milestone</ButtonSubmitUI>
        </Form>
      </div>
    </div>
  );
};

export default EditMilestonePage;
