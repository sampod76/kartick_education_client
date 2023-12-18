"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UploadImage from "@/components/ui/UploadImage";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import uploadImgBB from "@/hooks/imgbbUploads";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/adminApi/categoryApi";

import { ICategory } from "@/types";
import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, message } from "antd";
import Image from "next/image";

const EditCategoryPage = ({ params }: any) => {
  const { data: categoryData, isLoading } = useGetSingleCategoryQuery(
    params?.id,
    {
      skip: !Boolean(params?.id),
    }
  );
  console.log(categoryData);
  // const { data: categoryData = [] } = useGetAllCategoryQuery({});
  const [updateCategory, { isLoading: updateLoading, error }] =
    useUpdateCategoryMutation();

  const onSubmit = async (values: any) => {
    if (typeof values.img !== "string") {
      console.log(values);
      values.img = await uploadImgBB(values.img);
    }
    const UpdateValues = {
      ...values,
    };

    console.log(UpdateValues);
    try {
      const res = await updateCategory({
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

  const defaultValues = {
    title: categoryData?.title || "",

    img: categoryData?.img || "",

    status: categoryData?.status || "",

    // managementDepartment: CategoryData?.managementDepartment?.id || "",
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
              marginBottom: "10px",
            }}
          >
            <p
              style={{
                fontSize: "18px",
                marginBottom: "10px",
              }}
            >
              Category Information
            </p>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Category Name"
                  required={true}
                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                md={12}
                lg={8}
                style={{
                  marginBottom: "10px",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <UploadImage name="img" defaultImage={categoryData.img} />
                </div>
              </Col>

              {/* <Col span={12} style={{ margin: "10px 0" }}>
              <FormTextArea name="address" label="Address" rows={4} />
            </Col> */}
            </Row>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button htmlType="submit" type="default">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditCategoryPage;
