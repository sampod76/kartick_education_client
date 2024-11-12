"use client";
import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";

function DonateAndSupportBenner() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (cardName: any) => {
    setHoveredCard(cardName);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  return <div className="container mx-auto"></div>;
}

// export default DonateAndSupportBenner;
export default dynamic(() => Promise.resolve(DonateAndSupportBenner), {
  ssr: false,
});
