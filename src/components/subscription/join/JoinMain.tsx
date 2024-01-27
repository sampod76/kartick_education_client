"use client";
import React, { useState } from "react";
import JoinSelect from "./JoinSelect";
import JoinPackage from "./JoinPackage";
import PaymentCard from "./PaymentCard";
import { useSearchParams } from "next/navigation";

export type IPlan = "monthly" | "yearly" | 'biannual';

export default function JoinMain() {
  const searchParams = useSearchParams();
  const packName = searchParams.get("pack") as string;
  console.log(packName, 'packName')
  const [plan, setPlan] = useState<IPlan>("monthly");
  const [quantity, setQuantity] = useState<number>(packName === 'family_personal' ? 1 : 11);


  return (
    <div className="w-full lg:max-w-7xl mx-auto p-3">
      <JoinSelect
        plan={plan}
        setPlan={setPlan}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      <JoinPackage
        plan={plan}
        setPlan={setPlan}
        quantity={quantity}
        setQuantity={setQuantity}
      />
      {/* <PaymentCard /> */}
    </div>
  );
}
