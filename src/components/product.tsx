'use client';

import { getProduct } from '@/helper'
import { Products } from '@/typescript/response';
import React, { useEffect, useState } from 'react'
import Icon from '@/assets/Icon.png';
import Image from 'next/image';

export default function Product({ entryUrl }: { entryUrl: string }) {

    const [product, setProduct] = useState({} as Products);
    const [loading, setLoading] = useState(true);

    async function getProductInfo() {
        await getProduct(entryUrl).then(res => {
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
        <div className='flex flex-col items-center w-full p-10'>
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
                                    <li key={index} className='flex items-center gap-2 mt-[5px]'>
                                        <Image src={Icon} width={20} height={20} alt="" />
                                        {value.enter_specifications}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='flex items-center w-[70%] justify-between mt-[20px]'>
                        <h1>Price: Rs. {product.price}</h1>
                        <h1>Available Units: {product.stock}</h1>
                        <button className='p-2 bg-black text-white rounded' onClick={() => {
                            window.localStorage.setItem('selectedProduct', product.title);
                            window.open('/order');
                        }}>
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div>
                    <input type="text" placeholder='Enter a review' />
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
        </div>
    )
}