import JoinMain from "@/components/subscription/join/JoinMain";
import React from "react";

export default function SubscriptJoinPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      Subscript Join MonthlyPage{params?.id}
      <JoinMain />
    </div>
  );
}
