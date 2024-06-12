import Image from 'next/image'
import React from 'react'

const ClubSection: React.FC<{ title: string; content: string[] | React.ReactNode[] }> = ({ title, content }) => {
    return (
        <div className="mb-8">
            <h4 className="text-2xl font-bold mb-4">{title}</h4>
            <div className="list-disc pl-4">
                {content.map((item, index) => (
                    <p key={index} className="mb-2">
                        {item}
                    </p>
                ))}
                {/* {content} */}
            </div>
        </div>
    );
};

export default function ActivitiesPage() {

    return (
        <div className="-mt-[8px] ">

            <div className="relative">
                <Image alt="" src={"/banner/activityBanner.jpg"} className="-z-10 w-[100vw] h-[40vh] lg:h-[80vh]  -mt-[5rem]"
                    width={3200}
                    height={2200} />

            </div>

            <div className="flex flex-wrap justify-between p-4 space-y-4 md:space-y-0 container mx-auto text-white mt-7">
                <div className="w-full md:w-1/2 bg-blue-700 p-7 rounded">
                    <h2 className="text-2xl font-bold mb-4">SIGN UP FOR LIVE CLUBS!</h2>
                    <p className="text-base">
                        Students have the opportunity to meet live each week with a teacher and peers. Enjoy learning something new while connecting with friends each week! Our live clubs are available to our IBLossomlearn students for a simple $25 student yearly registration fee. If a club has different age groups, you will be placed based on grade level. Club fee of $25 per student will be billed when the club begins. Along with email, you will receive an email from your club(s) teacher with a Zoom link to use for that particular club. Emails are always from a <a href="https://iblossomlearn.com/">https://iblossomlearn.com/</a>
                    </p>
                </div>
                {/* card sections */}
                <div className="w-full md:w-1/2 bg-[#e9c328] p-7 rounded">
                    <h2 className="text-2xl font-bold mb-4">How Do I Sign Up?</h2>
                    <p className="text-base">
                        You can use the Live Clubs Signup button. You will be asked the information below. If you have a question about supplemental activities such as the Live Clubs, use the Live Clubs Question button. We will try to answer as quickly as possible.
                    </p>
                    <p className="text-base font-semibold">
                        Your email address. <br />
                        Student name. <br />
                        Grade level. <br />
                        Club(s) that you would like to enroll in.
                    </p>
                    <div className="border-t mt-4 pt-4">
                        {/* You can add your Live Clubs Signup and Live Clubs Question buttons here */}
                    </div>
                </div>

                {/* main content sections */}

                <div className="flex flex-col space-y-8 p-4 text-black mt-7">
                    <ClubSection
                        title="Welcome to IBLossom’s Connections Club!"
                        content={[
                            "We currently offer over different clubs available to our students, providing a wide array of opportunities - most certainly something for everyone.",
                            "We strongly encourage all of our students to explore their options and get involved in at least one student club or activity.",
                            "Studies have shown that the single most accurate predictor of success in life is the degree of involvement a person has had in co-curricular programs.",
                            "Get involved in IBLossom TODAY!",
                        ]}
                    />

                    <ClubSection
                        title="Study Skills Club"
                        content={[
                            "Is your child struggling to keep up with homework and class projects? Do they need help getting and staying organized? Or could they benefit from better active reading skills? If so, then it is time to start studying smarter, and not harder! For more than two decades IBLossomLearn has been a leading in-home and online tutoring company, and has developed proprietary curriculum to assist students in developing proper study and organizational skills! IBLossomLearn has developed an effective Learning Built to Last  study skills tutoring program that targets different learning styles and habits of students in grades 5-12, to help students develop lifelong study and organizational habits.",
                            "Students need the additional assistance in becoming more organized and adapting to new study skills as the curriculum becomes more demanding.",
                            "Providing your child with the opportunity to receive the following assistance in order to achieve academic success:",

                            "- Note-Taking Skills",
                            "- Study Habits",
                            "- Content Area Study Skills",
                            "- Homework",
                            "- Organizational Skills",
                        ]}
                    />
                    <ClubSection
                        title="6th-9th Grade Culinary Arts Club"
                        content={[
                            "The Culinary Arts club brings people interested in culinary arts and food service together at least once a month to cook and learn about cooking techniques, ethnic foods and to prepare for competition. This club is designed to enhance students’ culinary skills. It entails intensive hands on activities which provide opportunities our students to explore culturally diverse cuisines, engage in food art and build on their basic food preparation skills. Together we are driven by our passion for food, which is demonstrable through our hospitality services.",
                            "Sponsors: Chef Mott & Chef Jay",
                        ]}
                    />
                    <ClubSection
                        title="IBLossom TinyTots LitClub!"
                        content={[
                            "Kids experience books in a unique way. A literature club is a monthly activity that places a high value on the social needs of children and their parents. This entices the kids to give reading a chance. Interacting with family and friends is important to children. Moms need the camaraderie, too. Hanging out with their friends and sharing a meal together make literature club acceptable, even in the beginning, to those who think their moms have lost their minds when they tell them they are joining a  book club. In a short period of time, the experience changes their opinion about reading",
                        ]}
                    />
                    <ClubSection
                        title="Science Club! "
                        content={[
                            "",
                        ]}
                    />
                    <ClubSection
                        title="REAL WORLD APPLICATION"
                        content={[
                            "We do not lecture or use a textbook. Instead we show how science works in the real world by providing challenging, hands-on and exciting experiences in:",
                            <ul key="scienceList" className="list-disc pl-4">
                                <li>Veterinary medicine, Emergency Medicine</li>
                                <li>Robotics</li>
                                <li>Forensics</li>
                                <li>Video game creation</li>
                                <li>Food science</li>
                                <li>Meteorology</li>
                                <li>Engineering</li>
                                <li>Special effects and more — we have it all!</li>
                            </ul>
                        ]}
                    />
                    <ClubSection
                        title="INSPIRING THE NEXT GENERATION OF SCIENTISTS!"
                        content={[
                            "We do not lecture or use a textbook. Instead we show how science works in the real world by providing challenging, hands-on and exciting experiences in:",
                            <ul key="inspiringList" className="list-disc pl-4">
                                <li>Thrilling demonstrations</li>
                                <li>Entertaining activities</li>
                                <li>High-quality lab materials</li>
                                <li>Cutting-edge technologies</li>
                                <li>Problem-solving skills</li>
                                <li>Building prototypes</li>
                                <li>Having FUN!</li>
                            </ul>
                        ]}
                    />
                </div>

            </div>
        </div>
    )
}
