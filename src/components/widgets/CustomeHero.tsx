import Image from 'next/image';
import React from 'react';

const CustomeHero = ({ ...props }: any) => {
    const { title, image } = props;
    return (
        <div className='w-full'>
            <div className='w-full relative'>
                <Image
                    src={image || "/thirdparty1.png"}
                    className='w-full h-[400px] sm:h-[450px] object-cover'
                    alt=''
                    width={1500}
                    height={1200}
                />
                <div className='bg-white absolute bottom-1/4 left-1/2 transform text-center -translate-x-1/2 -translate-y-1/3 p-2 px-10 rounded-3xl bg-opacity-80 font-bold'>
                    <h1 className='text-3xl font-extrabold'>
                        {title || "Iblosssome"}
                    </h1>
                </div>
            </div>
            <div className='w-full h-10 bg-primary'>
            </div>
        </div>
    );
}

export default CustomeHero;
