import Image from 'next/image';
import React from 'react';

const MeetCard = ({ ...props }) => {
    const { title, desc, image, email } = props;

    return (
        <div className='w-full text-center rounded-lg bg-gray-300'>
            <Image src={image || "/DummyPerson.jpg"} className='w-full h-[250px] object-cover rounded-t-lg' alt='' height={1200} width={1200} />
            <div className='w-full h-1 bg-black'></div>
            <div className='flex flex-col gap-3 p-4'>
                <h3 className='text-lg font-semibold truncate'>
                    {title || "DR. Sabah"}
                </h3>
                {desc ? desc?.map((item: any, index: any) => {
                    return <p className='text-base text-gray-700 line-clamp-2' key={index}>{item}</p>

                }) : <p className='text-base text-gray-700 line-clamp-2'>
                    {desc || "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                </p>}
                {
                    email ? <p className='text-sm text-gray-600 truncate'>
                        {email || "Email"}
                    </p> : ""
                }
           
            </div>
        </div>
    );
}

export default MeetCard;
