"use client";

import CreateMilestone from "@/components/milestone/createAndUpdateMilestoned";
import React, { useState } from "react";

export default function CreateMilestonePage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <CreateMilestone setOpen={setOpen} />
    </div>
  );
}
