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
import { removeNullUndefinedAndFalsey } from "@/hooks/removeNullUndefinedAndFalsey";
import { useGetAllCategoryQuery } from "@/redux/api/adminApi/categoryApi";
import {
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";

import { Error_model_hook, Success_model } from "@/utils/modalHook";

import { Button, Col, Row, message } from "antd";
import Image from "next/image";

const EditUserData = ({ params }: any) => {
  const { data: serviceData, isLoading } = useGetSingleServiceQuery(params?.id);
  const { data: categoryData = [] } = useGetAllCategoryQuery({});
  const [updateService, { isLoading: updateLoading, error }] =
    useUpdateServiceMutation();

  const onSubmit = async (values: any) => {
    const UpdateValues = {
      ...values,
  
    };
    removeNullUndefinedAndFalsey(values);
    try {
      const res = await updateService({
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
      console.error(err);
      Error_model_hook(err?.message || err?.data)
    }
  };
  if (isLoading || updateLoading) {
    return <LoadingForDataFetch />;
  }
  if (error) {
    console.log(error);
  }

  const defaultValues = {
    title: serviceData?.title || "",
    price: serviceData?.price || "",
    image: serviceData?.image || "",
    description: serviceData?.description || "",
    address: serviceData?.address || "",
    contact: serviceData?.contact || "",
    availableTickets: serviceData?.availableTickets || "",
    serviceDate: serviceData?.serviceDate || "",
    status: serviceData?.status || "",
    category: serviceData?.category?._id || "",
    // managementDepartment: serviceData?.managementDepartment?.id || "",
  };

  return (
    <div>
      <div>
        {/* resolver={yupResolver(adminSchema)} */}
        {/* resolver={yupResolver(IServiceSchema)} */}
        <Form submitHandler={onSubmit} defaultValues={defaultValues} >
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
              Service Information
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
                  label="Service Name"
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
                <FormInput
                  type="number"
                  name="price"
                  size="large"
                  label="Per Ticket Price"
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
                <FormInput
                  type="text"
                  name="contact"
                  size="large"
                  label="Bus Driver Number"
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
                <Row gutter={[16, 16]}>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormDatePicker name="serviceDate" label="Date" />
                  </Col>
                  <Col
                    className="gutter-row"
                    span={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormInput
                      type="number"
                      name="availableTickets"
                      size="large"
                      label="Available Tickets"
                      required={true}
                    />
                  </Col>
                </Row>
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
                <Row gutter={[16, 16]}>
                  <Col
                    className="gutter-row"
                    xs={24}
                    md={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      name="category"
                      label="Select Category"
                      required={true}
                      options={
                        //@ts-ignore
                        categoryData?.data?.map((e) => ({
                          value: e._id,
                          label: e.title,
                        }))
                      }
                    />
                  </Col>
                  <Col
                    className="gutter-row"
                    xs={24}
                    md={12}
                    style={{
                      marginBottom: "10px",
                    }}
                  >
                    <FormSelectField
                      name="status"
                      label="Select status"
                      required={true}
                      options={[
                        {
                          value: "available",
                          label: "Available",
                        },
                        {
                          value: "upcoming",
                          label: "Upcoming",
                        },
                        {
                          value: "unavailable",
                          label: "Unavailable",
                        },
                      ]}
                    />
                  </Col>
                </Row>
              </Col>

              <Col
                className="gutter-row"
                xs={24}
               
                style={{
                  marginBottom: "10px",
                }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <UploadImage name="image" />
                  <Image
                    src={defaultValues?.image}
                    width={100}
                    height={100}
                    className="w-36"
                    alt="d"
                  />
                </div>
              </Col>
              <Col span={12} style={{ margin: "10px 0" }}>
                <FormTextArea
                  name="description"
                  label="Service description"
                  rows={4}
                />
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
            <Button htmlType="submit"   type="default">
              Update
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditUserData;
