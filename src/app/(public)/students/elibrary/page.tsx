import React from 'react'
import Image from "next/image";

export default function ELibraryPage() {
    return (
        <div className="-mt-[8px] ">
            <div className="relative">
                <Image alt="" src={"/banner/eLibraryBanner.jpg"} className="-z-10 w-[100vw] h-[40vh] lg:h-[80vh]  -mt-[5rem]"
                    width={3200}
                    height={2200} />
                <h2 className='absolute top-1/2 right-1/2 text-xl lg:text-5xl text-black font-bold'>E Learning </h2>
            </div>


            <div className="container mx-auto mt-7">
                <div className=" p-4">
                    <h4 className="text-xl font-bold mb-4">Children Books</h4>
                    <div className="space-y-2">
                        <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/aesopforchildren_1308_librivox.zip" className="text-blue-500 underline">The Aesop for Children (pdf)</a>
                        <br />
                        <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/blue_bird_for_children_1502_librivox.zip" className="text-blue-500 underline">The Blue Bird for Children (pdf)</a>
                        <br />
                        <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/blue_bird_for_children_1502_librivox.zip" className="text-blue-500 underline">The Box-Car Children (pdf)</a>
                        <br />
                        <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/boxcar_children_2_2102_librivox.zip" className="text-blue-500 underline">The Box-Car Children (Version 2) (pdf)</a>
                        <br />
                        <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/children_1705_librivox.zip" className="text-blue-500 underline">The Children (pdf)</a>
                        <br />
                        <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/children_home_1208_librivox.zip" className="text-blue-500 underline">Are The Children at Home? (pdf)</a>
                        <br />
                        <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/children_of_the_night_1604_librivox.zip" className="text-blue-500 underline">Children of the Night (pdf)</a>
                        <br />
                        <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/childrenofodin_etk_librivox.zip" className="text-blue-500 underline">The Children of Odin (pdf)</a>
                        <br />
                    </div>
                </div>
                <div className=" p-4 mb-4">
                    <h4 className="text-xl font-bold mb-2">Young Adults</h4>
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/shortstories_childrenadults_1801_librivox.zip" className="text-blue-500 underline">Short Stories for Children and Adults (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/young_adults_001_0907_librivox_64kb_mp3.zip" className="text-blue-500 underline">Young Adults Short Works Collection Vol. 001 (pdf)</a> <br />
                </div>

                <div className=" p-4 mb-4">
                    <h4 className="text-xl font-bold mb-2">Historical Biography</h4>
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/historical_newspaper_articles_vol_1_librivox_64kb_mp3.zip" className="text-blue-500 underline">Historical Newspaper Articles, Volume 1 (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/historic_news_articles_vol2_lah_librivox_64kb_mp3.zip" className="text-blue-500 underline">Historical Newspaper Articles, Volume 2 (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/historical_mysteries_2002_librivox.zip" className="text-blue-500 underline">Historical Mysteries (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/pope_adrian_iv_an_historical_sketch_1807_librivox.zip" className="text-blue-500 underline">Pope Adrian IV; An Historical Sketch (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/starved_rock_vj_librivox.zip" className="text-blue-500 underline">Starved Rock: A Historical Sketch (pdf)</a> <br />
                </div>

                <div className=" p-4">
                    <h4 className="text-xl font-bold mb-2">Travel</h4>
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/historical_newspaper_articles_vol_1_librivox_64kb_mp3.zip" className="text-blue-500 underline">The Art of Travel (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/childrensshortworks06_1005_librivox.zip" className="text-blue-500 underline">Children’s Short Works, Vol. 006 (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/explorersandtravellers_1509_librivox.zip" className="text-blue-500 underline">Explorers and Travellers (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/pope_adrian_iv_an_historical_sketch_1807_librivox.zip" className="text-blue-500 underline">Gulliver’s Travels (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/gullibles_travels_etc_wt_1411_librivox.zip" className="text-blue-500 underline">Gullible’s Travels, Etc. (pdf)</a> <br />
                    <a href="https://iblossomlearn.com/wp-content/uploads/2021/09/starved_rock_vj_librivox.zip" className="text-blue-500 underline">The Book of Camping and Woodcraft: A Guidebook for Those Who Travel in the Wilderness (pdf)</a> <br />
                </div>
            </div>
        </div>
    )
}
