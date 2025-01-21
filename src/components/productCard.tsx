import { Products } from '@/typescript/response'
import React from 'react'

export default function ProductCard({ data }: { data: Products }) {

    function findUrl(name: string) {
        return name.toLowerCase().split(' ').join('-');
    }

    return (
        <div className='w-[300px] h-[300px] flex flex-col items-center p-5 border-2'>
            <img className='h-[50%]' src={data.image.url} alt="" />
            <h1 className='mt-[10px] font-bold'>{data.title}</h1>
            <p className='text-[12px] text-start px-2'>{data.seller_desp}</p>
            <div className='flex items-center text-[14px] justify-between w-full px-2 mt-[10px]'>
                <p>Rs. {data.price}</p>
                <a href={`/product/${findUrl(data.title)}`} className='underline'>See more</a>
            </div>
        </div>
    )
}