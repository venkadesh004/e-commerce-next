'use client'

import { getProductPage, getReferenceProduct } from '@/helper';
import { Products } from '@/typescript/response';
import React, { useEffect, useState } from 'react'
import ProductCard from './productCard';

interface ProductReference {
    uid: string;
};

export default function AllProducts() {

    const [itemList, setItemList] = useState([] as Products[]);
    const [searchValue, setSearchValue] = useState('');

    async function getProductsPage() {
        await getProductPage().then(res => {
            res.reference.map(async (value, index) => {
                await getReferenceProduct(value.uid).then(res => {
                    setItemList(itemList => [...itemList, res]);
                }).catch(err => {
                    console.log(err);
                })
            });
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getProductsPage();
    }, []);

    const filteredResults = itemList.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <div className='w-full flex flex-col items-center'>
            <input type="text" placeholder='Search Product' onChange={(e) => {
                setSearchValue(e.target.value);
            }} value={searchValue} className='w-[70%] mt-[20px] p-2 border' />
            <div className='w-full flex items-center flex-wrap'>
                {filteredResults.map((value, index) => {
                    return (
                        <div key={index} className='p-10'>
                            <ProductCard data={value} />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}