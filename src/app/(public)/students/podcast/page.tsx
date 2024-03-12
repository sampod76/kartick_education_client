import React from 'react'
import podcastStart from "@/assets/podcast/podcast_star.png"
import podcast from "@/assets/podcast/sidePerson.png"
import podcastSide from "@/assets/podcast/sidePodCastOnlye.png"
import Image from 'next/image'
export default function PodCastPage() {
    return (
        <div className='container mx-auto mt-12 '>

            <div className='container mx-auto px-2 lg:px-7 flex flex-col gap-5 justify-center text-center'>
                <Image height={300} width={400} src={podcastStart} className='h-[18rem] w-[20rem] text-center mx-auto' alt="podast" />


                <div className="block lg:flex gap-7 p-5">
                    <div className="">
                        <h2 className='text-xl leading-10 font-semibold'>Auntie Audrey and Uncle Godfrey take a journey away from your computers, inside your imagination, into cosmos, and deep into the most exciting universe of diversity. The melting pot that meets children and their families who are excited and interested to visit the minds and hearts of traditions.</h2>


                        <h2 className='text-xl font-semibold mt-7'>Listen as some of their friends WOW you with their beautiful Music and Stories!!!</h2>
                    </div>
                    <Image height={300} width={400} src={podcastSide} className='h-[24rem] w-[36rem]' alt="podast" />
                </div>

                <div className="flex flex-col justify-center items-center">


                    <Image height={300} width={400} src={podcast} className='h-[36rem] w-[24rem] lg:w-[36rem] mx-auto' alt="podast" />

                    <p className='p-5 py-12 border-2 border-blue-500 rounded-md -mt-[4.5rem] tex-2xl'>Listen to any free episode; they will Wow your World and inspire you to seek out Cultures and Traditions of other lands. You are invited to share your adventures with Auntie Audrey & uncle Godfrey…Right here!</p>
                </div>


            </div>
        </div>
    )
}
