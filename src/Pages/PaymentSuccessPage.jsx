import React from 'react'

export default function PaymentSuccessPage() {
  return (
    <div className='flex  flex-col '>
    {/* Image */}
    <img
        src="./images/images (1).png"
        alt="Payment"
        className="w-full h-auto max-h-96 object-contain mb-10"
      />
      <div className='font-bold text-3xl' >Payment Done</div>
      </div>
  )
}
