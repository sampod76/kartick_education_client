import { useAddPaypalPaymentByCourseMutation } from "@/redux/api/public/paymentApi";
import { getUserInfo } from "@/services/auth.service";
import { Error_model_hook } from "@/utils/modalHook";
import { Button, message } from "antd";
import React from "react";
import ButtonLoading from "../ui/Loading/ButtonLoading";
import { useGetCheckPurchasesCourseQuery } from "@/redux/api/public/purchaseCourseApi";
import { USER_ROLE } from "@/constants/role";

export default function PaypalCheckoutByCourse({ courseData }: any) {
  const userInfo = getUserInfo() as any;
  const [
    createPaypalPaymentByCourse,
    { isLoading: PaypalPaymentLoading, error: PaypalPaymentError },
  ] = useAddPaypalPaymentByCourseMutation();

  const { data, isLoading } = useGetCheckPurchasesCourseQuery(
    {
      user: userInfo?.id,
      course: courseData?._id,
    },
    {
      skip: !Boolean(userInfo?.id),
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
    }
  );

  const makePayment = async (platform?: string) => {
    if (!userInfo?.id) {
      window.open("/login", "_blank");
      return;
    }
    //@ts-ignore
    if (!courseData?._id) {
      Error_model_hook("Please select any Course");
      return;
    }
    try {
      const resultPaypal = await createPaypalPaymentByCourse({
        item_list: {
          items: [
            {
              name: courseData?.title,
              sku: courseData?._id,
            },
          ],
        },
        data: {
          courseId: courseData?._id,
        },
      }).unwrap();

      if (resultPaypal?.url) {
        window.open(resultPaypal?.url, "_blank");
      }
    } catch (error: any) {
      console.log("🚀 ~ makePayment ~ error:", error);
      Error_model_hook(error?.message || "Something is wrong");
    }
  };
  return (
    <div className={`${data?.data?.length || userInfo?.role === USER_ROLE.SELLER ? "hidden" : "block"}`}>
      {PaypalPaymentLoading || isLoading ? (
        <Button
          type="default"
          style={{
            padding: "1rem",
            width: "3rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ButtonLoading />
        </Button>
      ) : (
        <button
          type="button"
          onClick={() => makePayment()}
          // disabled={!selectPackage?._id }
          className="text-white  bg-[#387ef7] hover:bg-[#F7BE38]/90 focus:ring-4 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 mr-2 mb-2 cursor-pointer"
        >
          <svg
            className="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="paypal"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path
              fill="currentColor"
              d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
            ></path>
          </svg>
          <p>
            <span className="hidden lg:block"> Check out with PayPal</span>{" "}
            <span className="lg:hidden">PayPal</span>
          </p>
        </button>
      )}
    </div>
  );
}
