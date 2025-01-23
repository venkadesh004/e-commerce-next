'use client';

import { getProduct } from '@/helper'
import { Products } from '@/typescript/response';
import React, { useEffect, useState } from 'react'
import Icon from '@/assets/Icon.png';
import Image from 'next/image';
import axios from 'axios';

export default function Product({ entryUrl }: { entryUrl: string }) {

    const [product, setProduct] = useState({} as Products);
    const [loading, setLoading] = useState(true);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        var rating = e.target.rating.value;
        var review = e.target.review.value;
        var item = product.title;

        axios.post('https://app.contentstack.com/automations-api/run/3c2d616d80b447808fb63321ca40ab35', {rating, review, item}).then(res => {
            if (res.status === 200) {
                alert('Review Sent');
            }
        }).catch(err => {
            console.log(err);
        });
    }

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
            <div className='flex lg:flex-row flex-col items-center w-full justify-between'>
                <div className='lg:w-[50%] w-[100%] flex items-center justify-center'>
                    <img className='w-[50%]' src={product.image.url} alt="" />
                </div>
                <div className='lg:w-[50%] w-[100%] lg:mt-[0px] mt-[100px]'>
                    <h1 className='text-6xl'>{product.title}</h1>
                    <p className='mt-[30px] lg:w-[80%] w-[100%]'>{product.product_desp}</p>
                    <div className='mt-[30px]'>
                        <h1 className='text-3xl'>Specifications</h1>
                        <ul className='border-2 lg:w-[60%] w-[100%] p-5 mt-[30px]'>
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
                    <div className='flex sm:flex-row flex-col items-center lg:w-[70%] w-[100%] justify-between mt-[20px]'>
                        <h1>Price: Rs. {product.price}</h1>
                        <h1 className='sm:mt-[0px] mt-[20px]'>Available Units: {product.stock}</h1>
                        <button className='p-2 bg-black text-white rounded sm:mt-[0px] mt-[20px]' onClick={() => {
                            window.localStorage.setItem('selectedProduct', product.title);
                            window.open('/order');
                        }}>
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col items-center mt-[50px]'>
                <div className='lg:w-[55%] w-[100%]'>
                    <h1 className='text-2xl font-bold mb-[10px]'>Send a Review</h1>
                    <form action="" className='w-full flex md:flex-row flex-col items-center justify-between' onSubmit={handleSubmit}>
                        <input type="number" placeholder='Set Rating' name='rating' className='w-[300px] p-2 border-2 md:mt-[0px] mt-[20px]' />
                        <input type="text" placeholder='Enter a review' name='review' className='w-[300px] p-2 border-2 md:mt-[0px] mt-[20px]' />
                        <button type='submit' className='w-[100px] p-2 rounded bg-black text-white md:mt-[0px] mt-[20px]'>Send</button>
                    </form>
                </div>
                <div className='flex md:w-[70%] w-[100%] flex-col gap-2 mt-[50px]'>
                    {product.rating.map((value, index) => {
                        return (
                            <div key={index} className='p-5 border-2'>
                                <p className='font-bold'>Rating: {value.stars.value}</p>
                                <p>{value.review}</p>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    )
}