"use client";
import React, { useState } from "react";
import JoinSelect from "./JoinSelect";
import JoinPackage from "./JoinPackage";
import PaymentCard from "./PaymentCard";

export default function JoinMain() {
  const [plan, setPlan] = useState<"monthly" | "yearly">("monthly");
  const [quantity, setQuantity] = useState<number>(1);

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
      <PaymentCard />
    </div>
  );
}
