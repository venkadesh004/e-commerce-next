'use client';

import AllProducts from '@/components/allProducts'
import Footer from '@/components/footer'
import Header from '@/components/header'
import React from 'react'

export default function Page() {
    return (
        <div>
            <Header />
            {typeof window !== "undefined" ? <AllProducts getFilter={window.localStorage.getItem('getFilter') === null ? '' : window.localStorage.getItem('getFilter')} /> : <AllProducts getFilter={''} />}
            <Footer />
        </div>
    )
}