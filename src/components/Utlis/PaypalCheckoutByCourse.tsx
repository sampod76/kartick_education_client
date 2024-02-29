import { useAddPaypalPaymentByCourseMutation } from "@/redux/api/public/paymentApi";
import { getUserInfo } from "@/services/auth.service";
import { Error_model_hook } from "@/utils/modalHook";
import { Button, message } from "antd";
import React from "react";
import ButtonLoading from "../ui/Loading/ButtonLoading";
import { useGetCheckPurchasesCourseQuery } from "@/redux/api/public/purchaseCourseApi";
import { USER_ROLE } from "@/constants/role";
import { useGlobalContext } from "../ContextApi/GlobalContextApi";

export default function PaypalCheckoutByCourse({ courseData }: any) {
const {userInfo,userInfoLoading} =useGlobalContext()
  console.log("🚀 ~ PaypalCheckoutByCourse ~ userInfo:", userInfo)
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
    <div className={`${ userInfo?.role === USER_ROLE.SELLER ? "hidden" : "block"}`}>
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
      ) :data?.data?.length ? <p className="text-red-600 bg-slate-200 p-5 text-center text-sm md:text-lg my-3">You have already purchased this course</p> : <button onClick={()=>makePayment("paypal")}  className="bg-[#5371FF]  p-3 mt-5 text-lg lg:text-xl font-bold text-white rounded uppercase">
        Place Order
      </button>}
    
    </div>
  );
}
