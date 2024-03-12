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
            <div className="flex flex-wrap-reverse items-center lg:flex justify-between mt-2 lg:mt-[4rem]  xl:justify-end container mx-auto p-2">

                <div className="w-full lg:w-[55%] text-sm lg:text-xl mx-auto text-[#000000] font-[400] px-5 pr-3 md:lg:pr-[5rem] lg:pr-[7rem] ">
                    <p>Sabah Kunle, holding an Ed.D. in Curriculum and Instruction, serves as the driving force behind IBLossomLearn as its Founder and CEO. With over a decade of classroom experience, she brings a wealth of practical knowledge to her role, adeptly blending pedagogical insights with curriculum design expertise. Sabah's doctoral studies have equipped her with a deep understanding of instructional methodologies and learning theories, providing a solid foundation for crafting innovative educational programs tailored to diverse student needs.</p>
                    <p className='hidden md:flex lg:flex mt-5'>Sabah's commitment to ongoing professional development shines through her extensive training in reading and literacy instruction. Actively engaging in workshops and seminars, she stays abreast of the latest research and best practices in literacy education, constantly refining her teaching approach. This continuous learning journey empowers Sabah to leverage evidence-based strategies and cutting-edge techniques in developing dynamic literacy programs that foster student growth and success..</p>
                    <p  className=' mt-5'>
                        Fueled by her unwavering passion for education, Sabah has channeled her expertise into creating the Grammar & Literacy program at IBLossomLearn. By synthesizing her classroom experience, academic background, and professional training, Sabah has curated a comprehensive program that empowers educators to seamlessly integrate literacy approaches into their teaching practice. Through her visionary leadership and innovative approach, Sabah is revolutionizing literacy education, equipping teachers with the tools and support they need to unlock their students' full potential and drive academic excellence.
                    </p>
                </div>
                <div className="  mx-auto">
                    <Image className='' height={400} width={550} src={"https://img.freepik.com/free-photo/image-icon-front-side-white-background_187299-40166.jpg?w=400&t=st=1708023279~exp=1708023879~hmac=55d02d06a0aad804c293defd256bbbd301a1830690e7982552a5614c7a7db2e3"} alt="aboutHero" />
                </div>
            </div>
            {/* course sections */}
            <div className="container mx-auto bg-[#A9DDF421]  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 py-[5rem] px-2">

                {aboutCourseData?.map((course: any, index: number) => {

                    return <div className=' bg-white  mx-auto border border-[#51ADD4] rounded-lg p-2' key={index + 1}>
                        <Image className='w-full h-[14rem] lg:h-[20rem]' src={course?.img} height={350} width={400} alt="course" />
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
            <div className="mt-5 container mx-auto  max-w-[950px] bg-white py-5 px-7">
                <h2 className='text-center text-4xl font-semibold '>Why Choose iBlossomLearn?</h2>

                <div className=" w-full  mx-auto flex flex-col gap-7 mt-5">
                    {
                        aboutFooterData?.map((about: any, index: number) => <div key={index} className=''>
                            <div className="flex items-center gap-3">
                                <p>  {about?.icon}</p>
                                <h2 className='font-bold text-xl capitalize'>  {about?.title}</h2>
                            </div>

                            <p className='px-9 w-full  ml-3 my-2'>
                                {about?.description}
                            </p>

                        </div>)
                    }

                </div>
            </div>
        </div>
    )
}
