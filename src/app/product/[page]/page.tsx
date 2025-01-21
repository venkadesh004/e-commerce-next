'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import Product from "@/components/product";

export default function Products() {

    const entryUrl = usePathname();

  return (
    <div>
      <Product entryUrl={entryUrl} />
    </div>
  )
}