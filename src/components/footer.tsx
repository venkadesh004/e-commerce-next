'use client';

import React, { useEffect, useState } from 'react'
import { getFooterPageRes } from '../helper';
import { FooterBlock } from '../typescript/component';

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
                        <div key={index} className='h-full w-[30%] flex items-center justify-center'>
                            <img className='h-[200px]' src={value.image_block.image.url} alt="" />
                        </div>
                    );
                } else {
                    return (
                        <div key={index} className='text-white flex flex-col items-start gap-5 w-[25%]'>
                            <h2>{value.links_block.link_title}</h2>
                            {value.links_block.links.map((element, index2) => {
                                return (
                                    <a key={index2} href={element.href}>
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