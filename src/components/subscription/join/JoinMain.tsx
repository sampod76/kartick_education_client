"use client";
import React, { useState } from "react";
import JoinSelect from "./JoinSelect";

export default function JoinMain() {
  const [plan, setPlan] = useState<string>("Monthly");
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <div className="w-full lg:max-w-4xl mx-auto p-3">
      <JoinSelect
        plan={plan}
        setPlan={setPlan}
        quantity={quantity}
        setQuantity={setQuantity}
      />
    </div>
  );
}
