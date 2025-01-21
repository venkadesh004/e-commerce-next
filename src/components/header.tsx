'use client';

import React, { useEffect, useState } from 'react'
import { getHeaderRes } from '../helper';
import { Link } from '../typescript/pages';
import { Auth } from '../typescript/component';
import Image from 'next/image';

export default function Header() {

    const [url, setUrl] = useState('');
    const [links, setLinks] = useState([] as Link[]);
    const [auth, setAuth] = useState([] as Auth[]);
    const [loading, setLoading] = useState(true);

    async function getHeaderInfo() {
        try {
            await getHeaderRes().then(res => {
                // console.log(res);
                setUrl(res.logo.url);
                setLinks(res.header_links);
                setAuth(res.auth);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getHeaderInfo();
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className='w-full'>
            <div className='w-full h-[60px] flex items-center p-2 justify-between'>
                <div className='w-[30%] h-full flex items-center justify-between'>
                    <Image src={url} alt="Logo" className='h-full' />
                    <div className='flex items-center justify-evenly w-[100%]'>
                        {links.map((value, index) => {
                            return (
                                <div key={index}>
                                    <a href={value.href}>{value.title}</a>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='w-[15%] flex items-center justify-evenly'>
                    {auth.map((value, index) => {
                        return (
                            <button key={index} onClick={() => {
                                window.open(value.auth_link.href);
                            }} className={`${value.background_inverted ? 'text-white bg-black' : 'text-black bg-white'} w-[150px] h-[40px] rounded`}>
                                {value.auth_link.title}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className='w-full h-[2px] bg-gray-200'></div>
        </div>
    )
}