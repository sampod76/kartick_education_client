import ReusableBanner from "@/components/allBanner/ReusableBanner";
import React from "react";

export default function Resources() {
  const banner = {
    bannerImagePath: "/banner/resources.png",
    bannerText: "Resources",
    className: "lg:h-[75vh]",
  };
  const bodyText = {
    text: "The iBlossomLearn eLibrary is a dynamic resource hub designed to support and enrich our students' learning experiences. With a vast collection of digital books, articles, and multimedia resources, the eLibrary provides easy access to essential reading materials across all subjects and grade levels. Whether students are conducting research, enhancing their literacy skills, or exploring new topics, our eLibrary offers a comprehensive selection tailored to their academic needs. Accessible anytime and anywhere, the eLibrary ensures that learning is always within reach.",
  };
  return (
    <div>
      <ReusableBanner
        banner={banner}
        headerText={{ text: "i-TalkEasi Unlimited" }}
        bodyText={bodyText}
      />
    </div>
  );
}
