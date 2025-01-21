'use client';

import { getProduct } from '@/helper'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';

export default function Product({entryUrl}: {entryUrl: string}) {

    // const pathName = usePathname();

    async function getProductInfo() {
        console.log(entryUrl);
        await getProduct(entryUrl).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getProductInfo();
    }, []);

    return (
        <div>

        </div>
    )
}