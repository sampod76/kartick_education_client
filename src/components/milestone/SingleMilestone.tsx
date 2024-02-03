import { SVGYelloDot } from '@/assets/svg/Icon';
import { IMilestoneData } from '@/types/miestoneType';
import Link from 'next/link';
import React from 'react'
import { ContainerOutlined } from "@ant-design/icons"

export default function SingleMilestone({ milestoneData, index }: { milestoneData: IMilestoneData, index: number }) {
    // console.log('milestoneData', milestoneData)

    return (
        <div
            className="border-2 shadow-xl  rounded-xl"
        >
            <Link
                href={`/module/${milestoneData?._id}`}
                className={`text-start text-[20px] flex gap-2 font-semibold font-['Inter'] leading-1 py-4  ${index % 2 === 0 ? "bg-green-500" : "bg-teal-500"
                    } ${index % 3 === 1 && "bg-blue-500"} text-white px-3 brightness-95 rounded-t-md`}
            >

                <ContainerOutlined />
                <span>{milestoneData?.title}</span>

                {/* //! Milestone Title */}
            </Link>
            <div className="py-3 px-2 pl-3">
                {milestoneData?.modules?.map((module: any, index: number) => {
                    return (
                        <Link
                            href={`/lesson/module/${module?._id}?module=${module?.title}`}
                            key={module?._id || index}
                            className="text-secondary text-start"
                            // className="text-sky-950 text-opacity-90 text-[18px] font-medium font-['Inter'] leading-2 flex gap-2 items-center"
                            style={{
                                display: "flex",
                                gap: "0.5rem",
                                alignItems: "start",
                                fontWeight: 500,
                                // color: "grey",
                                fontSize: "18px",
                                fontFamily: "Inter",
                                // marginBlock: "1rem",
                                textDecoration: "uppercase",
                                // padding: "2px 16px",
                            }}
                        >
                            {/* //! Modules List  */}
                            {/* <div className="Ellipse14 w-3 h-3 bg-yellow-400 rounded-full"></div> */}
                            <p className="mt-2">
                                {" "}
                                <SVGYelloDot />
                            </p>
                            {module?.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    )
}
