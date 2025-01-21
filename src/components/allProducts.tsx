'use client'

import { getProductPage, getReferenceDevice, getReferenceProduct } from '@/helper';
import { Filter, Products } from '@/typescript/response';
import React, { useEffect, useState } from 'react'
import ProductCard from './productCard';

interface ProductReference {
    uid: string;
};

export default function AllProducts({getFilter}: {getFilter: string | null}) {

    // console.log(getFilter);

    const [itemList, setItemList] = useState([] as Products[]);
    const [filterList, setFilterList] = useState([] as Filter[]);
    const [searchValue, setSearchValue] = useState('');
    const [currentFilter, setCurrentFilter] = useState(getFilter === null ? '' : getFilter);

    async function getProductsPage() {
        await getProductPage().then(res => {
            res.reference_filter.map(async (value, index) => {
                await getReferenceDevice(value.uid).then(output => {
                    setFilterList(filterList => [...filterList, output]);
                }).catch(err => {
                    console.log(err);
                });
            });
            res.reference.map(async (value, index) => {
                await getReferenceProduct(value.uid).then(async output => {
                    // console.log("Output", output);
                    await getReferenceDevice(output.reference[0].uid).then(newOutput => {
                        // console.log("New output", output);
                        output.referenceDevice = newOutput.title;
                        setItemList(itemList => [...itemList, output]);
                    }).catch(err => {
                        console.log(err);
                    });
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

    // console.log(itemList);

    const filteredResults = (currentFilter !== '') ? itemList.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase())) && itemList.filter(item => item.referenceDevice === currentFilter) : itemList.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
    // const filteredResults = itemList.filter(item => item.referenceDevice === currentFilter);

    return (
        <div className='w-full flex flex-col items-center'>
            <div className='w-full flex items-center justify-evenly'>
                <input type="text" placeholder='Search Product' onChange={(e) => {
                    setSearchValue(e.target.value);
                }} value={searchValue} className='w-[70%] mt-[20px] p-2 border' />
                <div className='mt-[20px]'>
                    <label>
                        Filter:
                        <select value={currentFilter} onChange={(e) => {
                            setCurrentFilter(e.target.value);
                        }}>
                            <option value="">
                                All
                            </option>
                            {filterList.map((value, index) => {
                                // console.log("result", value);
                                return (
                                    <option value={value.title} key={index}>
                                        {value.title}
                                    </option>
                                );
                            })}
                        </select>
                    </label>
                </div>
            </div>
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