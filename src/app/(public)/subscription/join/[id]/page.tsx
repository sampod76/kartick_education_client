import SUbscriptionForm from "@/components/subscription/SUbscriptionForm";
import React from "react";

export default function SubscriptionJoinPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <div className=""></div>
      <div className="">
       
        <SUbscriptionForm />
      </div>
    </div>
  );
}
