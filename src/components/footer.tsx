'use client';

import React, { useEffect, useState } from 'react'
import { getFooterPageRes } from '../helper';
import { FooterBlock } from '../typescript/component';
import Image from 'next/image';

export default function Footer() {

    const [loading, setLoading] = useState(true);
    const [footerBlock, setFooterBlock] = useState([] as FooterBlock[]);

    async function getFooterInfo() {
        try {
            await getFooterPageRes().then(res => {
                setFooterBlock(res.footer_block);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getFooterInfo();
    }, []);

    if (loading) {
        return (
            <div>
                Loading...
            </div>
        );
    }

    return (
        <div className='flex items-center w-full h-[300px] bg-[#0F0F0F] mt-[100px] justify-evenly'>
            {footerBlock.map((value, index) => {
                if (value.image_block !== undefined) {
                    return (
                        <div key={index} className='hidden h-full w-[30%] md:flex items-center justify-center'>
                            <Image className='h-[200px]' width={200} height={200} src={value.image_block.image.url} alt="" />
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className='text-white flex flex-col items-start gap-5 md:w-[25%] w-[30%]'>
                            <h2 className='text-[12px] sm:text-[18px]'>{value.links_block.link_title}</h2>
                            {value.links_block.links.map((element, index2) => {
                                return (
                                    <a key={index2} href={element.href} className='text-[10px] sm:text-[16px]'>
                                        {element.title}
                                    </a>
                                );
                            })}
                        </div>
                    );
                }
            })}
        </div>
    )
}