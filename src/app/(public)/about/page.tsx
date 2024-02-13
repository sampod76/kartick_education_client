import BannerAbout from '@/components/Home/Banner&hero/BannerAbout'
import BannerCourses from '@/components/Home/Banner&hero/BannerCourses'
import React from 'react'

export default function AboutPage() {
    return (
        <div>
            <div className="-mt-[5.8rem] mb-4 lg:mb-6 ">
                <div className="w-full min-h-[7rem] bg-[#BEDDF9]"></div>
                <BannerAbout />
            </div>
        </div>
    )
}
