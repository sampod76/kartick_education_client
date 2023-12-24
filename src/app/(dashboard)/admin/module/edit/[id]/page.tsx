"use client";

import Form from "@/components/Forms/Form";

import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {

} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import SelectAuthorField from "@/components/Forms/SelectData/SelectAuthor";
import SelectMilestoneField from "@/components/Forms/SelectData/SelectMilestone";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import ButtonSubmitUI from "@/components/ui/ButtonSubmitUI";

import UploadImage from "@/components/ui/UploadImage";
import TagsSelectUI from "@/components/ui/dashboardUI/TagsSelectUI";
import { courseStatusOptions } from "@/constants/global";

import uploadImgBB from "@/hooks/imgbbUploads";

import {
  useGetSingleModuleQuery,
  useUpdateModuleMutation,
} from "@/redux/api/adminApi/moduleApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import {  Col, Row,  } from "antd";

import { useState } from "react";

const EditModulePage = ({ params }: any) => {
  const { data: ModuleData, isLoading } = useGetSingleModuleQuery(params?.id, {
    skip: !Boolean(params?.id),
  });
  console.log(ModuleData);
  // const { data: ModuleData = [] } = useGetAllCategoryQuery({});
  const [updateModule, { isLoading: updateLoading, error }] =
    useUpdateModuleMutation();
 
  // !  tag selection

  const [selectedTags, setSelectedTags] = useState<string[]>(
    ModuleData?.tags || []
  );

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
      const res = await updateModule({
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

  console.log(ModuleData);
  const defaultValues = {
    title: ModuleData?.title || "",

    img: ModuleData?.img || "",

    status: ModuleData?.status || "",
    details: ModuleData?.details || "",
    module_number: ModuleData?.module_number || "",

    // managementDepartment: ModuleData?.managementDepartment?.id || "",
  };
  console.log(defaultValues);

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(ICategorySchema)} */}
        <Form submitHandler={onSubmit} defaultValues={defaultValues}>
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Create Module
            </p>
            <hr className="border-1.5 mb-2" />
            <Row gutter={[16, 16]}>
              <Col
                className="gutter-row"
                xs={24}
                md={20}
                // lg={8}
                style={{}}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Module Title"
                  required={true}
                />
                {/*//! 1 */}
              </Col>
              <Col className="gutter-row" xs={4} style={{}}>
                <FormInput
                  type="number"
                  name="module_number"
                  size="large"
                  label="Module No"
                  required={true}
                />
                {/*//! 2 */}
              </Col>
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectMilestoneField />
                {/* //! price type 5*/}
              </Col>

              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <SelectAuthorField />
                {/* //! price type 4*/}
              </Col>

              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <FormSelectField
                  size="large"
                  name="status"
                  options={courseStatusOptions as any}
                  // defaultValue={priceTypeOptions[0]}
                  label="status"
                  // placeholder="Select"
                  required={true}
                />
                {/* //! price type 8*/}
              </Col>
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <TagsSelectUI
                  selected={selectedTags}
                  setSelected={setSelectedTags}
                />
                {/*//! 11 */}
              </Col>
              <Col className="gutter-row" xs={24} md={12} lg={8} style={{}}>
                <UploadImage name="img" />
                {/* //!7*/}
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

          <ButtonSubmitUI>Create</ButtonSubmitUI>
        </Form>
      </div>
    </div>
  );
};

export default EditModulePage;
