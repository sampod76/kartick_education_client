import BannerAbout from '@/components/Home/Banner&hero/BannerAbout'
import BannerCourses from '@/components/Home/Banner&hero/BannerCourses'
import React from 'react'
import aboutHero from "@/assets/SideImage/aboutGirl.png"
import Image from 'next/image'

export default function AboutPage() {
    return (
        <div>
            {/* about banner */}
            <div className="-mt-[5.8rem] mb-4 lg:mb-6 ">
                <div className="w-full min-h-[7rem] bg-[#BEDDF9]"></div>
                <BannerAbout />
            </div>

            {/* about hero  */}

            <div className="block lg:flex justify-between mt-3 lg:mt-[5rem] container mx-auto">
                <div className="w-full lg:w-[55%] text-xl mx-auto text-[#000000] font-[400] px-5 pr-3 lg:pr-[7rem] ">
                    <p>Sabah Kunle is the Founder and CEO of IBLossomLearn. Sabah incorporates her 13 years of classroom experience, her knowledge, expertise, and degree in curriculum development, and her professional trainings in guided reading and literacy instruction to help teachers learn how to implement a Literacy approach into their skills acquisition easily and effectively.</p>
                    <p>The goal of her in-depth Grammar & Literacy  program is to help scholars learn how to effectively reach their highest achievement levels. Sabah’s passion for education and love of sharing her experiences with other educators has led to many others implementing her literacy framework into their own classrooms to help engage their students in greater buy-ins as committed allies to learning. Thus increasing and improving their chances for overall academic and social success..</p>
                </div>
                <div className="w-full lg:w-[45%] mx-auto">
                    <Image className='' height={400} width={550} src={aboutHero} alt="aboutHero" />
                </div>
            </div>
        </div>
    )
}
