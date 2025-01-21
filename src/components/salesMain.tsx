'use client';

import React, { useEffect, useState } from 'react'
import { getSalesPageRes } from '../helper';
import { SaleGroup } from '../typescript/component';

export default function SalesMain() {

    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([] as SaleGroup[]);

    async function getSalesInfo() {
        try {
            await getSalesPageRes().then(res => {
                // console.log(res);
                setGroups(res.group);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSalesInfo();
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className='flex items-center w-full justify-evenly mt-[100px]'>
            {groups.map((value, index) => {
                return (
                    <button key={index} onClick={() => {
                        window.open(value.link.href);
                    }} className='relative w-[400px] h-[400px]'>
                        <img className='absolute top-0 left-0 h-full w-full' src={value.image.url} alt="" />
                        <h1 className='absolute top-0 left-0 text-white font-bold text-5xl w-full h-full text-center flex items-center justify-center'>{value.para}</h1>
                    </button>
                );
            })}
        </div>
    )
}