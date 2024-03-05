import Image from 'next/image'
import React from 'react'

const ClubSection: React.FC<{ title: string; content: string[] | React.ReactNode[] }> = ({ title, content }) => {
    return (
        <div className="mb-8">
            <h4 className="text-xl font-bold mb-4">{title}</h4>
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

export default function LearningActPage() {

    return (
        <div className="-mt-[8px] ">

            <div className="relative">
                <Image alt="" src={"/banner/learningActBanner.jpg"} className="-z-10 w-[100vw] h-[40vh] lg:h-[80vh]  -mt-[5rem]"
                    width={3200}
                    height={2200} />
                <h2 className='absolute top-1/2 right-1/2  text-2xl  lg:text-5xl text-white uppercase font-bold text-nowrap'>     THE LEARNING ARC TUTORING</h2>
            </div>

            <div className="flex flex-wrap justify-between p-4 space-y-4 md:space-y-0 container mx-auto text-white mt-7">



                {/* main content sections */}

                <div className="flex flex-col space-y-8 p-4 text-black mt-7">
                    <h3 className="text-xl font-bold mb-4 text-center">Assist your student in getting ahead or</h3>
                    <ClubSection
                        title="catching up in his studies!"
                        content={[
                            "IBLossomLearn specializes in tailoring its programs to each student’s specific needs. All of our tutors come to you as highly trained professionals, and we take the time to find the best match for you. Contact us if you want your child to have tutoring that will challenge them, build their confidence, improve their study skills, and help them get better grades.",
                        ]}
                    />

                    <ClubSection
                        title="Why The Learning Arc Tutoring?"
                        content={[
                            "At IBLossom, our unique approach to tutoring through The Learning Arc will help your child feel confident in his or her learning. Learning is not a “one size fits all” approach: every child’s needs and abilities are unique. So, each IBLossomLearn program is made to fit the unique learning needs of each child.",
                            "Through The Learning Arc, we look at each student’s individual goals, educational needs, and learning styles, and pair our tutors with those students accordingly. Before we find the right tutor for your child, we build a strong academic and cognitive profile of his or her needs. Using those results, we find the right fit for him or her and build a program that is unique to your child’s learning needs and academic goals."
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
