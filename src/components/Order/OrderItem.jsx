import React, { useState } from 'react'

function OrderItem({item}) {


  const {totalPrice} = item; 

  const {username,useremail,product_id} = item.paymentDetail;

  const orderitems = item.items;

  const [order,setOrder] = useState(false);

  const [loading,setLoading] = useState(false);
  


  return (
    <>
    <div className='flex border border-[var(--border)] items-center p-2 gap-4 rounded-md'>
    {order ? <div className='grid grid-cols-1 sm:grid-cols-2'>
      {orderitems.map((item)=>(<DetailItem item={item}/>))}
      <button onClick={()=> setOrder(false)} className='px-4 py-2 bg-green-600 text-white'>Close</button>
    </div> : (
     <>
      <div>
      <img src={orderitems[0].img}   alt="orderImg"  className="w-[65px]   sm:w-[100px] sm:h-[100px] bg-cover bg-center object-cover" loading='lazy'/>
    </div>
    <div className='flex flex-col gap-2 justify-center items-start'>
       <h2>{username}</h2>
       <h2>{useremail}</h2>
       <h2 className='font-medium'>{product_id}</h2>
       <h2 className='font-semibold'>{`Rs.${totalPrice}(${orderitems.length})`}</h2>
       <button className='bg-green-600 px-4 py-2 rounded-md text-white' onClick={()=> setOrder(true)}>See all</button>
    </div>
     </>
    )}
    </div>
    </>
  )
}

export default OrderItem


const DetailItem =({item})=>{




  return(
    <>
     <div clas>
        <div>
          <img src={item.img} alt="productImg" className="w-[65px]   sm:w-[100px] sm:h-[100px] bg-cover bg-center object-cover" loading='lazy' />
        </div>
        <div className='flex flex-col'>
           <h2>{item.name}</h2>
           <h2>{`${item.price}*${item.qty} = ${item.price*item.qty}`}</h2>
           <h2>{item.category}</h2>
        </div>
     </div>
    </>
  )

}