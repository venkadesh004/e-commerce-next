import Footer from '@/components/footer'
import Header from '@/components/header'
import Main from '@/components/main'
import SalesMain from '@/components/salesMain'
import React from 'react'

export default function Home() {
  return (
    <div>
      <Header />
      <Main />
      <SalesMain />
      <Footer />
    </div>
  )
}