// import MeetCard from '@/components/shared/MeetCard'
// import CustomeHero from '@/components/widgets/CustomeHero'
// import React from 'react'
// import aboutOwner from "@/assets/about/about_Owner.jpeg";
// import Link from 'next/link';

// const page = () => {

//     const Administartions = [
//         {
//             title: "Dr. Sabah Alfaramawy",
//             desc: ["School Director ", "DEAN Of Curricilum & Instruction"],
//             image: "/about_Owner.jpeg",
//             email: "dr.sabah-elfaramawy@iblossomlearn.org"
//         },
//         {
//             title: "Tung Hoang",
//             desc: ["Chief Data Support Speacialist", "Student Service Coordinator (Registrar)"],
//             image: "/tuang1.png",
//             email: "tung.hoang@iblossomlearn.org"
//         },

//         {
//             title: "Gilles Konan Kouadio",
//             desc: ["Communication & Marketing", "Family Engagement Coordinator"],
//             image: "/tuang2.png",
//             email: "gilles.k.kouadio@iblossomlearn.org"
//         },
//         {
//             title: "Usha",
//             desc: ["Technology Support Specialist"],
//             email: "techsupport@iblossomlearn.org",
//             image: "/dummyFemal.png"
//         },

//     ]
//     const Academics = [
//         {
//             title: "Meah Hill",
//             desc: ["Academic Advisor", "SEL Support Specialist"],
//             image: "/meahHill.png"
//         },
//         {
//             title: "Barbra Morgan",
//             desc: ["SPED Resource", "Student Support Specialist"],
//             image: "/barbra.png"
//         },
//         {
//             title: "Gloria Boman",
//             desc: ["STEM"],
//             image: "/dummyFemal.png"

//         },
//         {
//             title: "Ola Adeyemi-Bajo",
//             desc: ["English, Writing"],
//             image: "/dummyFemal.png"
//         },
//         {
//             title: "Christopher Peters",
//             desc: ["Humanities"],

//         },

//     ]
//     const Teachers = [
//         {
//             title: "Dr. Shawky Salah Alfaramawy",
//             desc: ["Arabic, Hausa, Amharic, Hebrew"],
//             image: "/shawky.png"
//         },
//         {
//             title: "Felicte Acho",
//             desc: ["French, ESOL"],
//             image: "/falicite.png"
//         },
//         {
//             title: "Abdul-Mo'ty Muhammad Shaheen",
//             desc: ["Spanish, Italian, Russian, German"],

//         },

//     ]

//     return (
//         <div>

//             <div>
//                 <CustomeHero title={"Meet Our Team"} image={"/meetTeam.png"} />

//                 <div className='sm:container px-2 mx-auto'>

//                     <div className='flex flex-col gap-3 py-[30px] '>
//                         <h2 className='text-2xl text-center'>
//                             Administration
//                         </h2>

//                         <div className="grid sm:px-0 px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">

//                             {Administartions?.map((item: any, index: any) => {
//                                 return <MeetCard key={index} title={item?.title} image={item?.image} desc={item?.desc} email={item?.email} />
//                             })}
//                         </div>
//                     </div>
//                     <div className='flex flex-col gap-3 py-[30px] '>
//                         <h2 className='text-2xl text-center'>
//                             Academic Support
//                         </h2>

//                         <div className="grid sm:px-0 px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">

//                             {Academics?.map((item: any, index: any) => {
//                                 return <div key={index} className='flex flex-col pb-2 rounded-lg bg-gray-300 items-center  justify-between'> <MeetCard title={item?.title} image={item?.image} desc={item?.desc} />
//                                     <div className='p-1 text-lg  text-white border-2 border-primary w-fit rounded-3xl'>
//                                         <button className='bg-primary p-1 px-12 rounded-3xl'>
//                                             <Link href={"/contact"}>
//                                                 Contact Me</Link>
//                                         </button>
//                                     </div>
//                                 </div>
//                             })}
//                         </div>
//                     </div>
//                     <div className='flex flex-col gap-3 py-[30px] '>
//                         <h2 className='text-2xl text-center'>
//                             language Teachers
//                         </h2>

//                         <div className="grid sm:px-0 px-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">

//                             {Teachers?.map((item: any, index: any) => {
//                                 return (<div key={index} className='flex flex-col pb-2 rounded-lg bg-gray-300 items-center  justify-between'> <MeetCard title={item?.title} image={item?.image} desc={item?.desc} />
//                                     <div className='p-1 text-lg  text-white border-2 border-primary w-fit rounded-3xl'>
//                                         <button className='bg-primary p-1 px-12 rounded-3xl'>
//                                             <Link href={"/contact"}>
//                                                 Contact Me</Link>
//                                         </button>
//                                     </div>
//                                 </div>)
//                             })}

//                         </div>
//                     </div>

//                 </div>

//             </div>

//         </div>
//     )
// }

// export default page

import React from 'react';

export default function MeetOurTem() {
  return <div>Not found</div>;
}
