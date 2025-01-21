'use client';

import React, { useEffect, useState } from 'react'
import { getMainPageRes } from '../helper';
import { Link } from '../typescript/pages';
import { Specials } from '../typescript/component';
import Image from 'next/image';

export default function Main() {

    const [loading, setLoading] = useState(true);
    const [mainHeading, setMainHeading] = useState('');
    const [mainPara, setMainPara] = useState('');
    const [link, setLink] = useState({} as Link);
    const [imageUrl, setImageUrl] = useState('');
    const [specials, setSpecials] = useState([] as Specials[]);

    async function getMainPageInfo() {
        try {
            await getMainPageRes().then(res => {
                // console.log(res);
                setMainHeading(res.main_page_header);
                setMainPara(res.main_page_para);
                setLink(res.see_more);
                setImageUrl(res.image.url);
                setSpecials(res.specials);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            })
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMainPageInfo();
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
            <div className='w-full flex items-center justify-evenly'>
                <div className='w-[50%] p-10'>
                    <div className='w-full text-8xl font-black'>
                        {mainHeading}
                    </div>
                    <div className='w-full text-4xl font-normal mt-[50px]'>
                        {mainPara}
                    </div>
                    <div>
                        <button className='w-[200px] h-[50px] bg-black text-white rounded mt-[50px]' onClick={() => {
                            window.open(link.href);
                        }}>
                            {link.title}
                        </button>
                    </div>
                </div>
                <div className='w-[50%] flex items-center justify-center'>
                    <Image src={imageUrl} alt="" className='w-[50%]' />
                </div>
            </div>
            <div className='flex items-center justify-center gap-10'>
                {specials.map((value, index) => {
                    return (
                        <div key={index} className='flex items-center justify-evenly w-[300px] border-2 p-5 rounded'>
                            <Image src={value.special_image.url} alt="" className='h-[30px]' />
                            <div>
                                <p className='text-[20px] font-bold'>{value.special_head}</p>
                                <p className='text-[15px]'>{value.special_para}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}