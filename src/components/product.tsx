'use client';

import { getProduct } from '@/helper'
import { Products } from '@/typescript/response';
import React, { useEffect, useState } from 'react'

export default function Product({ entryUrl }: { entryUrl: string }) {

    const [product, setProduct] = useState({} as Products);
    const [loading, setLoading] = useState(true);

    async function getProductInfo() {
        console.log(entryUrl);
        await getProduct(entryUrl).then(res => {
            console.log(res);
            setProduct(res);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getProductInfo();
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className='flex flex-col items-center w-full'>
            <div className='flex items-center w-full justify-between'>
                <div className='w-[50%] flex items-center justify-center'>
                    <img className='w-[50%]' src={product.image.url} alt="" />
                </div>
                <div className='w-[50%]'>
                    <h1 className='text-6xl'>{product.title}</h1>
                    <p className='mt-[30px] w-[80%]'>{product.product_desp}</p>
                    <div className='mt-[30px]'>
                        <h1 className='text-3xl'>Specifications</h1>
                        <ul className='border-2 w-[60%] p-5 mt-[30px]'>
                            {product.specifications.map((value, index) => {
                                return (
                                    <li key={index}>
                                        {value.enter_specifications}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='flex w-[70%]'>
                {product.rating.map((value, index) => {
                    return (
                        <div key={index}>
                            <p>{value.stars.value}</p>
                            <p>{value.review}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}