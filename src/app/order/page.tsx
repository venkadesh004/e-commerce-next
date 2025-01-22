'use client';
import axios from 'axios';
import React from 'react'

export default function Order() {

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const user = {
            email: e.target.email.value,
            name: e.target.name.value,
            phone: e.target.phone.value,
            quantity: e.target.quantity.value,
            address: e.target.address.value,
            product: window.localStorage.getItem('selectedProduct')
        };
       axios.post('https://app.contentstack.com/automations-api/run/537d1114a6374ea0a2579b0673a29c16', user).then(res => {
        console.log(res);
        if (res.status === 200) {
            alert("Order Sent!");
        }
       }).catch(err => {
        console.log(err);
       });
    }

    return (
        <div className='flex items-center justify-center w-full h-screen'>
            <form action="" className='w-[500px] h-[700px] flex flex-col items-center justify-center gap-8 border-2' onSubmit={handleSubmit}>
                <h1 className='text-4xl font-bold'>ORDER DETAILS</h1>
                Product: {window.localStorage.getItem('selectedProduct')}
                <input type="text" placeholder='User Name' className='border-2 w-[400px] p-2' name='name' />
                <input type="text" placeholder='User Email' className='border-2 w-[400px] p-2' name='email' />
                <input type="text" placeholder='User Phone' className='border-2 w-[400px] p-2' name='phone' />
                <input type="number" placeholder='Quantity' className='border-2 w-[400px] p-2' name='quantity' />
                <textarea name="address" placeholder='Address' className='border-2 w-[400px] p-2'></textarea>
                <button type='submit' className='w-[400px] p-2 bg-black text-white'>ORDER NOW</button>
            </form>
        </div>
    )
}