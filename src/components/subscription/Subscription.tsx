"use client";
import React, { useState } from "react";
import SubscriptionSelect from "./SubscriptionSelect";
// import { useClient } from 'next/client';


export default function Subscription() {
  const [test, setTest] = useState("")
  
  return (
    <div className="min-h-screen">
      <SubscriptionSelect />
    </div>
  );
}
