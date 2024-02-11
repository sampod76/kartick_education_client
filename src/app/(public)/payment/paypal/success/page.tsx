"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useGetCheckPaypalPaymentQuery } from "@/redux/api/public/paymentApi";
import PaymentFail from "@/components/payment/errorPayment";
import PaymentSuccessComponent from "@/components/payment/successPayment";

export default function PaypalSuccess() {
  const purchase_transactionsId = useSearchParams().get(
    "purchase_transactionsId"
  );

  // const app = useSearchParams().get("app");
  // const paymentId = useSearchParams().get("paymentId");
  // const PayerID = useSearchParams().get("PayerID");
  // const token = useSearchParams().get("token");
  // const query: Record<string, any> = {};
  // query["app"] = app;
  // query["paymentId"] = paymentId;
  // query["PayerID"] = PayerID;
  // query["token"] = token;
  // const { data, isLoading, error, isSuccess } = useGetCheckPaypalPaymentQuery(
  //   {
  //     ...query,
  //   },
  //   { skip: !Boolean(app) }
  // );

  // if (isLoading) {
  //   return (
  //     <div>
  //       <div
  //         id="loading"
  //         className="animate-pulse fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center text-center"
  //       >
  //         <div className="animate-[spin_1.8s_linear_infinite]">
  //           <div className="w-14 h-14 border rounded-lg  z-30 bg-sky-500 animate-[ping_1.4s_linear_infinite]">
  //             <div className="w-[58px] h-[58px] relative -top-[1.4px] -left-[2px]   rounded-full  bg-white"></div>
  //           </div>
  //         </div>
  //         <p>Please wait while we process your payment.</p>
  //         <p>Do not exit this page.</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <>
      {purchase_transactionsId ? (
        <PaymentSuccessComponent orderNumber={purchase_transactionsId} />
      ) : (
        <PaymentFail message="" />
      )}
    </>
  );
}
