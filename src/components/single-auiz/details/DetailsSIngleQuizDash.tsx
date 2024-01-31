'use client';
import LoadingSkeleton from '@/components/ui/Loading/LoadingSkeleton';
import { useGetSingleOneQuizQuery } from '@/redux/api/adminApi/singleQuizApi'
import { IAnswer } from '@/types/quiz/singleQuizType';
import TextToSpeech from '@/utils/TextToSpeech';
import { Checkbox, Radio } from 'antd';
import Image from 'next/image';
import React from 'react'

export default function ViewSIngleQuizDash({ singleQuizId }: { singleQuizId: string }) {
    const { data: quiz, isLoading } = useGetSingleOneQuizQuery(singleQuizId)

    console.log(quiz, 'quiz')
    if (isLoading) {
        return (
            <div className="">
                <LoadingSkeleton />
            </div>
        )
    }
    return (
        <div>

            {<div className={`m-4 w-full relative `}>
                <div className="text-center mt-4 flex justify-center items-center">
                    {/* <p>Time Remaining: {timer} seconds</p> */}
                    QUiz Time:  {quiz?.time_duration && (
                        <span>{Math.floor(quiz.time_duration / 1000 / 60)} </span>
                    )} Minutes
                </div>

                <div className="flex justify-between items-center my-2 pr-4">
                    <p className={`lg:text-lg font-[550] mb-2 text-base mx-2`}>
                        <TextToSpeech text={quiz?.title} />
                        Question  : {quiz?.title}
                    </p>

                </div>
                <div className="flex flex-wrap mx-5">
                    {quiz?.imgs?.map((img: string, key: number, allimages: any[]) => (
                        <Image
                            key={key}
                            src={img}
                            width={700}
                            height={700}
                            className={"w-96 lg:w-full max-h-44 lg:max-h-48 m-3"}
                            alt=""
                        ></Image>
                    ))}
                </div>

                {quiz?.type === "select" && (
                    <Radio.Group
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                        name="radiogroup"

                        defaultValue={quiz?.answers?.find((item: IAnswer) => item?.correct === true)?._id}

                    // defaultValue={submittedDefaultData?.submitAnswers[0]} // Set the default value based on isDefaultValue

                    >
                        {quiz?.answers?.map((option: any, index: number) => {
                            // const isCorrect = quiz?.answers?.find((item: IAnswer) => item?.correct === true)
                            // console.log(index, 'isCorrect', isCorrect)
                            // const defaultValue= []
                            // const filterCorrect = quiz?.answers?.find((item: any) => item?.correct === true)

                            // console.log('filterCorrect', filterCorrect)
                            return (
                                <Radio
                                    key={option?._id}
                                    value={option?._id}
                                // defaultChecked={
                                //   submittedDefaultData?.submitAnswers[0] === option?._id &&
                                //   true
                                // }


                                >
                                    <div
                                        className={`border-2 rounded-xl p-2 w-full 
                           ${option?.correct === true && " border-2 border-green-600"}       
        `}
                                    >
                                        <p>{option?.title}</p>
                                        <div className="flex flex-wrap w-full">
                                            {option?.imgs?.map(
                                                (img: string, key: number, allimages: any[]) => (
                                                    <Image
                                                        key={key}
                                                        src={img}
                                                        width={700}
                                                        height={700}
                                                        className={`w-96 lg:w-full  max-h-24 lg:max-h-44`}
                                                        alt=""
                                                    ></Image>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </Radio>
                            );
                        })}
                    </Radio.Group>
                )}

                {quiz?.type === "multiple_select" && (
                    <Checkbox.Group
                        // defaultValue={submittedDefaultData?.submitAnswers} // Set the default value based on isDefaultValue
                        // disabled={isDefaultValue?.is_time_up ? true : false}


                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                        }}
                        defaultValue={quiz?.answers
                            .filter((item: any) => item?.correct === true)
                            .map((item: any) => item?._id)}
                    >
                        {quiz?.answers?.map((option: any) => {
                            // const isCorrect = quiz?.answers?.find((item: IAnswer) => item?.correct === true)
                            // const filterCorrect = quiz?.answers
                            //     .filter((item: any) => item?.correct === true)
                            //     .map((item: any) => item?._id);

                            // console.log('filterCorrect', filterCorrect)
                            // console.log(isCorrect, ".............", option,isSubmitted);
                            return (
                                <Checkbox
                                    key={option?._id}
                                    value={option?._id}
                                // defaultChecked={
                                //   !submittedDefaultData?.submitAnswers.find(
                                //     (item: string) => item === option?._id
                                //   )
                                // } // Check if the default value matches

                                // defaultValue={filterCorrect}


                                >
                                    <div
                                        className={`border-2 rounded-xl p-2 w-full  ${option?.correct === true && " border-2 border-green-600"}     
                      `}
                                    >
                                        <p>{option?.title}</p>
                                        <div className="flex flex-wrap w-full">
                                            {option?.imgs?.map(
                                                (img: string, key: number, allimages: any[]) => (
                                                    <>
                                                        <Image
                                                            key={key}
                                                            src={img}
                                                            width={700}
                                                            height={700}
                                                            className={`w-32 lg:w-96 max-h-24 lg:max-h-44`}
                                                            alt=""
                                                        ></Image>
                                                    </>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </Checkbox>
                            );
                        })}
                    </Checkbox.Group>
                )}


            </div>}

        </div>
    )
}
