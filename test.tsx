import { useGlobalContext } from '@/components/ContextApi/GlobalContextApi'
import React from 'react'

export default function Test() {
  const { userInfo, userInfoLoading } = useGlobalContext()
  if (userInfoLoading) {
    return <h1>Loading......</h1>
  }
  return (
    <div>{userInfo?.role}</div>
  )
}
