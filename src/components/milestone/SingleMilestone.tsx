import { SVGYelloDot } from '@/assets/svg/Icon';
import Link from 'next/link';
import React from 'react'

export default function SingleMilestone(milestoneData: any) {
    return (
        <div
            key={milestoneData?._id}
            className="border-2 shadow-xl p-2 rounded-xl"
        >
            <Link
                href={`/module/${milestoneData?._id}`}
                className="text-start text-gray-800 text-[20px] font-semibold font-['Inter'] leading-1 "
            >
                💥 {milestoneData?.title}
                {/* //! Milestone Title */}
            </Link>
            <div className="py-3 ">
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
