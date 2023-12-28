"use client"
import React from 'react'
import { QRCode } from 'react-qrcode-logo';

function Qrcode() {
  return (
    <div className='flex justify-center my-6  md:mb-20'>
    <div className='flex flex-col gap-5'>
    <QRCode  size={300} value={process.env.NEXT_PUBLIC_QRCODE_URL}  />
    <p className='text-2xl font-extrabold self-center'>Scan the Qr code</p>
    </div>
    </div>
  )
}

export default Qrcode
