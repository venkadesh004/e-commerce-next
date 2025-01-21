'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import Product from "@/components/product";
import Header from '@/components/header';
import Footer from '@/components/footer';

export default function Products() {

    const entryUrl = usePathname();

  return (
    <div>
      <Header />
      <Product entryUrl={entryUrl} />
      <Footer />
    </div>
  )
}