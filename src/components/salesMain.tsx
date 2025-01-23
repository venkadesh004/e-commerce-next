'use client';

import React, { useEffect, useState } from 'react'
import { getReferenceDevice, getSalesPageRes } from '../helper';
import { SaleGroup } from '../typescript/component';
import Image from 'next/image';

export default function SalesMain() {

    const [loading, setLoading] = useState(true);
    const [groups, setGroups] = useState([] as SaleGroup[]);

    async function getSalesInfo() {
        try {
            await getSalesPageRes().then(async res => {
                // console.log(res);
                res.group.map(async (element, index2) => {
                    await getReferenceDevice(element.reference_device[0].uid).then(output => {
                        res.group[index2].referedDevice = output.title;
                    }).catch(err => {
                        console.log(err);
                    })
                });
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
        <div className='flex xl:flex-row flex-col items-center w-full justify-evenly mt-[50px]'>
            {groups.map((value, index) => {
                return (
                    <button key={index} onClick={() => {
                        window.open(value.link.href);
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem('getFilter', value.referedDevice);
                        }
                    }} className='relative sm:w-[400px] sm:h-[400px] w-[300px] h-[300px] mt-[50px]'>
                        <img className='absolute top-0 left-0 h-full w-full' src={value.image.url} alt="" />
                        <h1 className='absolute top-0 left-0 text-white font-bold text-5xl w-full h-full text-center flex items-center justify-center'>{value.para}</h1>
                    </button>
                );
            })}
        </div>
    )
}