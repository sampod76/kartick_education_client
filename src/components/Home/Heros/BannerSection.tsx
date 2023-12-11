import React from 'react';
import bannerBG from "@/assets/banner/bannerBG.png"
import treeBoy from "@/assets/banner/treeBoy.png"
import Image from 'next/image';
import {SearchOutlined} from "@ant-design/icons";
import Link from 'next/link';

const BannerSection = () => {
    return (
        <div className="my-5 block lg:flex justify-betwee place-items-end bg-blue-20 min-h-[45rem] text-left "
        style={{
            backgroundImage:`url(${bannerBG})`,
            backgroundRepeat:"no-repeat",
            backgroundSize:"contain", 
          }}
        >
            <section className='w-full lg:w-[70%] px-[59px] py-[3rem]'>
                <div className="text-7xl font-[800] text-black capitalize">
                <h1>Feel bored or anxious</h1>
                <h1>About <span className="text-secondary">Math or English</span> ?</h1>
                </div>
                <p className="mt-[2rem] text-[45px] ">Overcome challenges with
                 <span className="text-secondary">
                 iBlossomLearn </span> classes. Your adventure in learning awaits!</p>
                <div className="mt-[3rem] max-h-[3.8rem] flex">
                    <input type="text" placeholder='Search here' className=" border-2 border-primary rounded-l-[8px] w-[512px] p-2 bg-[#ADADFA40] h-[3.8rem]" />
                    <h3 className='bg-primary p-[16px] rounded-r-[8px] w-[3.7rem] h-[3.8rem]'>
                    <SearchOutlined style={{
                        minHeight:"24px",
                        width:"24px",
                        color:'white',
                        fontWeight:"700"
                    }} />
                    </h3>
                </div>

                <div className="mt-[5rem] block lg:flex gap-3 text-[1.2rem] text-white font-[700] capitalize">
                    <Link className="bg-primary h-[3.3rem] p-3 rounded-[8px]"  href="/">Get started new</Link>
                    <Link className="bg-secondary h-[3.3rem] p-3 rounded-[8px]" href="/">FREE READING FOR ANY SEASON</Link>
                </div>
            </section>
            <section className='w-full lg:w-[30%] mt-0 lg:-mt-[2rem]'>
           
                <Image className='w-auto mx-auto ' src={treeBoy} height={602} width={510} alt="treeboy"/>
            </section>
        </div>
    );
};

export default BannerSection;