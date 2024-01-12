"use client";

import React, { useState } from "react";
import CreateMilestone from '@/components/milestone/createAndUpdateMilestoned';

export default function CreateMilestonePage() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <CreateMilestone setOpen={setOpen} />
    </div>
  );
}
