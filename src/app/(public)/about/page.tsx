import BannerAbout from '@/components/Home/Banner&hero/BannerAbout'
import BannerCourses from '@/components/Home/Banner&hero/BannerCourses'
import React from 'react'
import aboutHero from "@/assets/about/aboutGirl.png"
import aboutCourse1 from "@/assets/about/aboutCourse1.png"
import aboutCourse2 from "@/assets/about/aboutCourse2.png"
import aboutCourse3 from "@/assets/about/aboutCourse3.png"
import Image from 'next/image'
import { DollarOutlined, FileDoneOutlined, FieldTimeOutlined, SolutionOutlined } from "@ant-design/icons";
import { EllipsisMiddle } from '@/utils/CutTextElliples'

export default function AboutPage() {

    const aboutFooterData = [
        {
            title: "Affordable Tuition", description: "IBLossomLearn’s affordable tuition allows families to have a full-stack program with a variety of discounted tuition rates and payment plans. Our interest-free payment plans offer affordability to almost all families. Our goal is to provide an affordable, quality education to any student that desires the opportunity to succeed. Our admission specialist will be sure to inform you of all your options, allowing you to choose the one that is most comfortable for you.", icon: <DollarOutlined style={{
                fontSize: '1rem',
                padding: "8px",
                border: "2px solid black",
                borderRadius: "50%",
            }} />
        },
        {
            title: "Enroll Anytime, Anywhere", description: "In our Online program, you can begin at Any time and from Any location that has Internet access. We will ship everything directly to you if you are a member of our Book Program.", icon: <FileDoneOutlined style={{
                fontSize: '1rem',
                padding: "8px",
                border: "2px solid black",
                borderRadius: "50%",
            }} />
        },
        {
            title: "Flexible Schedule", description: "Our parents have the freedom to set their children's school schedules in a way that fits their demanding daily routines.", icon: <FieldTimeOutlined style={{
                fontSize: '1rem',
                padding: "8px",
                border: "2px solid black",
                borderRadius: "50%",
            }} />
        },
        {
            title: "Flexible Program Structure", description: "Our parents have the freedom to set their children's school schedules in a way that fits their demanding daily routines.", icon: <SolutionOutlined style={{
                fontSize: '1rem',
                padding: "8px",
                border: "2px solid black",
                borderRadius: "50%",
            }} />
        },
    ]

    const aboutCourseData = [
        { title: "Explore Your Creative Side!", description: "Our art and craft ideas are perfect for parents and teachers of kids of all ages. E.g. baby handprint art, toddler craft projects, preschool art and craft ideas, kindergarten art based learning resources and many more art and craft ideas to inspire creativity and have fun!", img: aboutCourse1 },
        { title: "Discover Fun Activities In Culinary Arts", description: "Our art and craft ideas are perfect for parents and teachers of kids of all ages. E.g. baby handprint art, toddler craft projects, preschool art and craft ideas, kindergarten art based learning resources and many more art and craft ideas to inspire creativity and have fun!", img: aboutCourse2 },
        { title: "Stories Podcast", description: "Stories play a powerful role in our culture. they do not just entertain and inform us. they are tools to create connections between people. so it's no surprise that we wanted to bring some of your favorite narratives. Enjoy recorded sessions 24 hours per day.", img: aboutCourse3 },
    ]
    return (
        <div>
            {/* about banner */}
            <div className="-mt-[5.8rem] mb-4 lg:mb-6 ">
                <div className="w-full min-h-[7rem] bg-[#BEDDF9]"></div>
                <BannerAbout />
            </div>

            {/* about hero  */}
            <div className="flex flex-wrap-reverse lg:flex justify-between mt-[4rem]  xl:justify-end container mx-auto">

                <div className="w-full lg:w-[55%] text-xl mx-auto text-[#000000] font-[400] px-5 pr-3 md:lg:pr-[5rem] lg:pr-[7rem] ">
                    <p>Sabah Kunle is the Founder and CEO of IBLossomLearn. Sabah incorporates her 13 years of classroom experience, her knowledge, expertise, and degree in curriculum development, and her professional trainings in guided reading and literacy instruction to help teachers learn how to implement a Literacy approach into their skills acquisition easily and effectively.</p>
                    <p className='hidden md:flex lg:flex mt-5'>The goal of her in-depth Grammar & Literacy  program is to help scholars learn how to effectively reach their highest achievement levels. Sabah’s passion for education and love of sharing her experiences with other educators has led to many others implementing her literacy framework into their own classrooms to help engage their students in greater buy-ins as committed allies to learning. Thus increasing and improving their chances for overall academic and social success..</p>
                </div>
                <div className="w-full md:w-[45%] lg:w-[45%] mx-auto">
                    <Image className='' height={400} width={550} src={aboutHero} alt="aboutHero" />
                </div>
            </div>
            {/* course sections */}
            <div className="container mx-auto bg-[#A9DDF421]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-[5rem]">

                {aboutCourseData?.map((course: any, index: number) => {

                    return <div className='max-w-[480px] md:w-full lg:max-w-[400px] xl:w-[480px] bg-white  mx-auto border border-[#51ADD4] rounded-lg p-2' key={index + 1}>
                        <Image className='w-full h-[20rem]' src={course?.img} height={350} width={400} alt="course" />
                        <div className="px-3">
                            <h2 className='text-2xl  font-semibold my-3 text-center'>{course?.title}</h2>
                            <p className='my-4 py-5'>
                                {/* {course?.description} */}
                                <EllipsisMiddle
                                    suffixCount={3}
                                    maxLength={220}
                                >
                                    {course?.description}
                                </EllipsisMiddle>
                            </p>
                        </div>

                    </div>
                })}

            </div>
            {/* footer sections */}
            <div className="mt-5 container mx-auto bg-white py-5 px-7">
                <h2 className='text-center text-4xl font-semibold '>Why Choose iBlossomLearn?</h2>

                <div className=" w-full lg:w-[80%] mx-auto flex flex-col gap-7 mt-5">
                    {
                        aboutFooterData?.map((about: any, index: number) => <div key={index} className=''>
                            <div className="flex items-center gap-3">
                                <p>  {about?.icon}</p>
                                <h2 className='font-bold text-xl capitalize'>  {about?.title}</h2>
                            </div>

                            <p className='px-9 w-full md:max-w-[80%] lg:max-w-[75%]  my-3'>
                                {about?.description}
                            </p>

                        </div>)
                    }

                </div>
            </div>
        </div>
    )
}
