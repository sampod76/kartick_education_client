import { AllImage } from '@/assets/AllImge'
import Image from 'next/image'
import React from 'react'

export default function Assignment() {
  return (
    <div className='flex justify-center items-center '><Image alt="" src={AllImage.upcoming} width={700} height={700} /></div>
  )
}
