"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import LoadingForDataFetch from "@/components/Utlis/LoadingForDataFetch";
import UploadImage from "@/components/ui/UploadImage";
import HeadingUI from "@/components/ui/dashboardUI/HeadingUI";
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import {
  useGetSingleCategoryQuery,
  useUpdateCategoryMutation,
} from "@/redux/api/adminApi/categoryApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, message } from "antd";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";

export default function EditCategory({ categoryId }: { categoryId: string }) {
  const [isReset, setIsReset] = useState(false);
  const { data: categoryData = {}, isLoading } = useGetSingleCategoryQuery(
    categoryId,
    {
      skip: !Boolean(categoryId),
    }
  );

  // const { data: categoryData = [] } = useGetAllCategoryQuery({});
  const [updateCategory, { isLoading: updateLoading, error }] =
    useUpdateCategoryMutation();

  const onSubmit = async (values: any) => {
    removeNullUndefinedAndFalsey(values);
    const UpdateValues = {
      ...values,
    };

    try {
      const res = await updateCategory({
        id: categoryId,
        data: UpdateValues,
      }).unwrap();

      if (res?.success == false) {
        Error_model_hook(res?.message);
      } else {
        Success_model("successfully updated data");
        setIsReset(true);
      }
    } catch (err: any) {
      console.error(err);
      Error_model_hook(err?.message || err?.data);
    }
  };
  if (isLoading || updateLoading) {
    return <LoadingForDataFetch />;
  }
  if (error) {
    console.log(error);
  }

  return (
    <div>
      <div className="max-w-md mx-auto rounded-xl shadow-xl p-3 bg-white">
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(ICategorySchema)} */}
        <Form
          isReset={isReset}
          submitHandler={onSubmit}
          defaultValues={categoryData}
        >
          <div
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <HeadingUI>Category Information</HeadingUI>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col
                className="gutter-row"
                xs={24}
                md={24}
                lg={24}
                style={{
                  marginBottom: "20px",
                  maxWidth: "30vw",
                  margin: "0 auto",
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

                style={{
                  marginBottom: "20px",
                  // maxWidth: "30vw",
                  // margin: "0 auto",
                }}
              >
                <FormInput
                  type="number"
                  name="serial_number"
                  size="large"
                  label="Category serial number"

                />
              </Col>

              <Col
                className="gutter-row"
                xs={24}
                style={{
                  marginTop: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <UploadImage name="img" defaultImage={categoryData?.img} />
              </Col>
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
              Update Category
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

// export default dynamic(() => Promise.resolve(EditCategory), {
//   ssr: false,
// });
