import React from 'react'
import milestoneIcon from "@/assets/Icon/milestoneIcon.png";
import Link from 'next/link';
import Image from 'next/image';


export default function MilestoneHomeFeatures2() {
    const milestoneData = {
        "_id": "milestone_di",
        title: "IBLossomLearn Proficiency Pro Academy",
        modules: [{ _id: '1', title: 'Math' },
        { _id: '2', title: 'Calculus' },
        { _id: '3', title: 'Mechanics' },
        { _id: '4', title: 'Physics' },
        { _id: '5', title: 'Chemistry' },
        { _id: '6', title: 'Biology' },
        { _id: '7', title: 'Computer Science' },
        { _id: '8', title: 'Programming' },
        { _id: '9', title: 'History' },
        { _id: '10', title: 'Geography' },
        { _id: '11', title: 'Literature' },
        { _id: '12', title: 'Art' },
        { _id: '13', title: 'Music' },
        { _id: '14', title: 'Languages' },
        { _id: '15', title: 'Economics' },
        { _id: '16', title: 'Statistics' },
        { _id: '17', title: 'Psychology' },
        { _id: '18', title: 'Sociology' },
        { _id: '19', title: 'Philosophy' },
        { _id: '20', title: 'Environmental Science' },
        { _id: '21', title: 'Political Science' },
        { _id: '22', title: 'Astrophysics' },
        { _id: '23', title: 'Environmental Engineering' },
        { _id: '24', title: 'Psychiatry' },
        { _id: '25', title: 'Business Administration' },
        { _id: '26', title: 'Digital Marketing' },
        { _id: '27', title: 'Robotics' },
        { _id: '28', title: 'Astrobiology' },
        { _id: '29', title: 'Criminal Justice' },
        { _id: '30', title: 'Medical Ethics' },
        { _id: '31', title: 'Film Studies' },
        { _id: '32', title: 'Data Science' },
        { _id: '33', title: 'Renewable Energy' },
        { _id: '34', title: 'Neuroscience' },
        { _id: '35', title: 'Graphic Design' },
        { _id: '36', title: 'International Relations' },
        { _id: '37', title: 'Cybersecurity' },
        { _id: '38', title: 'Astronomy' },
        { _id: '39', title: 'Ancient History' },
        { _id: '40', title: 'Nutrition Science' }
        ]
    };
    return (
        <div className='rounded-[28px] bg-[#2AAAE2] px-3 py-5 container mx-auto mt-7'>

            <h1 className='text-center  text-white text-2xl lg:text-3xl my-3'>{milestoneData?.title}</h1>
            <div className="bg-[#424644] gap-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-[1rem] rounded-b-xl">
                {
                    milestoneData?.modules?.map((module: any) => {
                        return <Link href={`/`} className=' flex gap-2 items-center text-white' key={module?._id}>
                            <Image src={milestoneIcon} height={20} width={20} alt='icon' />

                            <h4>{module?.title} Level One</h4>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}
