import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ThirdPartyWebsiteSection = () => {
    return (
        <div className="sm:container  mx-auto py-[20px] gap-10 flex flex-col px-3">

            <div className='mt-6'>
                <h2 className='text-center  text-4xl font-bold leading-normal mb-6'>
                    IBlossomLearn Word Wonders
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className=' rounded-lg'>
                        <Image src={"/thirdparty1.png"} className='h-[450px] rounded-xl border-8 border-gray-300' alt='' width={1200} height={1200} />
                    </div>
                    <div className='p-2 flex flex-col justify-between'>

                        <p className='leading-[20.5px]'><span className='font-bold mr-2'>iBlossomLearn Word Wonders:-</span>
                           {"Welcome to the iBlossomLearn Word Wonders course, an exclusive integration and collaboration with our literacy partners within our iBlossomLearn curriculum. This course is designed to elevate students' literacy skills through engaging, interactive, and comprehensive activities that foster a love for reading and writing. Covering all aspects of literacy, including reading, writing, spelling, grammar, and comprehension, the curriculum meets educational standards and helps students develop strong foundational skills. Through LiteracyPlanet's interactive platform, students engage in fun and effective activities such as games, quizzes, and multimedia content, catering to different learning styles and keeping students motivated."}
                            {"The iBlossomLearn Word Wonders course adapts to each student's learning pace and style, offering personalized pathways that ensure the right level of challenge and support. Parents and educators can track students' progress with detailed reports and analytics, facilitating targeted intervention and support. The course provides an extensive library of digital books, stories, and reading materials to cater to different interests and reading levels, along with skill-building exercises focused on spelling, grammar, and writing. With a user-friendly platform and 24/7 access, students can practice their literacy skills anytime, anywhere, fitting learning into their busy schedules. The iBlossomLearn Word Wonders course is dedicated to nurturing proficient and enthusiastic readers and writers, preparing students for academic success and a lifelong love of learning."}
                        </p>

                        <div className='rounded-3xl border-2 border-primary w-full mt-5'>
                            <button className='bg-primary p-2 rounded-3xl px-5 border-4 text-[12px] lg:text-base text-white border-white w-full'>
                                <Link href={"/contact"} >
                                    Click Here To Continue your Learning Adventure</Link>
                            </button>
                        </div>




                    </div>
                </div>

            </div>
            <div>
                <h2 className='text-center  text-4xl font-bold leading-normal mb-6'>
                    IBlossomLearn Comprehensive
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>

                    <div className='p-2 flex flex-col justify-between'>

                        <p className='leading-[20.5px]'><span className='font-bold mr-2'>iBlossomLearn Comprehensive:-</span>
                            {"Welcome to iBlossomLearn Comprehensive, an exclusive integration of this k12 accredited platform within our iBlossomLearn curriculum. This advanced program provides a comprehensive and engaging educational experience by blending core academic subjects such as Math, Language Arts, Science, and Social Studies with exciting enrichment activities plus 2 electives. Students benefit from interactive, multimedia-rich lessons, including videos, games, quizzes, and hands-on projects, making learning both fun and effective. Personalized learning paths ensure that every student receives the necessary support and challenges to succeed, while detailed progress monitoring and reporting tools help parents and educators track student performance and identify areas for improvement."}

                            {"iBlossomLearn Comprehensive also offers extensive supplemental resources, such as printable worksheets, educational games, and additional activities to reinforce learning. The user-friendly interface allows students to easily access lessons and assignments, and with 24/7 access, they can learn at their convenience, fitting education seamlessly into their schedules. In addition to core subjects, the program includes a variety of enrichment courses and electives, allowing students to explore new interests and develop additional skills. iBlossomLearn Comprehensive is more than just a curriculum; it is an immersive educational journey designed to inspire and empower students, preparing them for academic success and lifelong learning. Students can complete their high school diploma at their own pace."}

                        </p>

                        <div className='rounded-3xl border-2 border-primary w-full mt-5'>
                            <button className='bg-primary p-2 rounded-3xl px-5 border-4 text-[12px] lg:text-base text-white border-white w-full'>
                                <Link href={"/contact"}>
                                    Click Here To Continue your Learning Adventure</Link>
                            </button>
                        </div>




                    </div>
                    <div className=''>
                        <Image src={"/thirdparty2.png"} className='h-[450px] rounded-xl border-8 border-gray-300' alt='' width={1200} height={1200} />
                    </div>
                </div>

            </div>
            <div>
                <h2 className='text-center  text-4xl font-bold leading-normal mb-6'>
                IBlossomLearn Essential Pathways
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                    <div className=''>
                        <Image src={"/thirdparty1.png"} className='h-[450px] rounded-xl border-8 border-gray-300' alt='' width={1200} height={1200} />
                    </div>
                    <div className='p-2 flex flex-col justify-between'>

                        <p className='leading-7'><span className='font-bold mr-2'>iBlossomLearn Essential Pathways:-</span>
                            {"Welcome to BlossomLearn Essential Pathways, an exclusive integration within our iBlossomLearn curriculum. This advanced program is designed to provide students with a comprehensive and engaging educational experience, blending core academic subjects with personalized skill-building activities. Through our grammar and literacy partner, BlossomLearn, students receive targeted practice in Math, Language Arts, Science, and Social Studies, ensuring they master essential concepts and skills. BlossomLearn Essential Pathways goes beyond traditional learning methods by incorporating cutting-edge educational technologies and evidence-based teaching approaches. The platform adapts to each student's learning pace, providing customized challenges that promote critical thinking and problem-solving skills. This tailored approach helps bridge learning gaps and accelerates academic growth, making it ideal for students seeking to excel in today’s fast-paced educational environment."}
                        </p>

                        <div className='rounded-3xl border-2 border-primary w-full mt-5'>
                            <button className='bg-primary p-2 rounded-3xl px-5 border-4 text-[12px] lg:text-base text-white border-white w-full'>
                                <Link href={"/contact"}>
                                    Click Here To Continue your Learning Adventure</Link>
                            </button>
                        </div>




                    </div>
                </div>

            </div>



        </div>
    )
}

export default ThirdPartyWebsiteSection