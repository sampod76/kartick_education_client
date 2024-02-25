"use client";
import { useGetSingleContactQuery } from '@/redux/api/adminApi/contactApi';
import React from 'react'
import CardLoading from '../ui/Loading/CardLoading';

export default function ContactDetails({ contactId }: { contactId: string }) {

    const { data, isLoading } = useGetSingleContactQuery(contactId)

    if (isLoading) {
        return <>
            <CardLoading />
        </>
    }
    return (
        <div>ContactDetails</div>
    )
}
