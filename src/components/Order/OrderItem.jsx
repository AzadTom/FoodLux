import React from 'react'

function OrderItem({item}) {


  const {totalPrice} = item; 

  const {username,useremail,product_id} = item.paymentDetail;

  const orderitems = item.items;

  

  return (
    <div className='flex border border-[var(--border)] items-center p-2 gap-4 rounded-md'>
        <div>
          <img src={orderitems[0].img}   alt="orderImg"  className=" w-full h-[300px]   bg-center bg-cover object-cover rounded-md " loading='lazy'/>
        </div>
        <div className='flex flex-col gap-2 justify-center items-start'>
           <h2>{username}</h2>
           <h2>{useremail}</h2>
           <h2 className='font-medium'>{product_id}</h2>
           <h2 className='font-semibold'>{`Rs.${totalPrice}(${orderitems.length})`}</h2>
           <button className='bg-green-600 px-4 py-2 rounded-md text-white'>See all</button>
        </div>
    </div>
  )
}

export default OrderItem