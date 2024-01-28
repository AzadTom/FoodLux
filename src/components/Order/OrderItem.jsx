import React, { useState } from 'react'
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SellIcon from '@mui/icons-material/Sell';
import StarIcon from '@mui/icons-material/Star';
import Model from '../../components/Cart/Model';
import CloseIcon from '@mui/icons-material/Close';

function OrderItem({item}) {


  const {totalPrice} = item; 

  const {username,useremail,product_id} = item.paymentDetail;

  const orderitems = item.items;

  const [order,setOrder] = useState(false);


  const allproducts = (<Model closeModel={()=> seeAll()}>
        <div className='flex  gap-4 flex-col bg-[var(--primarycolor)] px-4 py-2 overflow-scroll' onClick={(e)=> e.stopPropagation()}>
          <div className='py-2  flex justify-between px-2'>
          <h2 className='font-semibold text-2xl'>Orders</h2>
           <button onClick={()=> setOrder(false)} className='bg-[var(--border)] text-[var(--primarycolor)] p-1'><CloseIcon/></button>
          </div>
       {orderitems.map((item)=>(<DetailItem item={item} key={item.id}/>))}
      <button  className='px-4 py-2 bg-green-600 text-white'>{`Rs.${totalPrice}(${orderitems.length}items)`}</button>
    </div>
  </Model> )

  

   const seeAll = ()=>{

      setOrder((prev)=>(!prev));
   }
  
  return (
    <>
    <div className='flex items-center p-2 gap-4 rounded-md'>
     {order && allproducts } 
     {!order && <Item orderdetail={ {username,product_id,totalPrice, img:orderitems[0].img , qty:orderitems.length}} seeAll={()=> seeAll()}/>} 
    </div>
    </>
  )
}

export default OrderItem


// Main Order items Detail
const DetailItem =({item})=>{




  return(
    <>
     <div className='flex gap-4 items-center'>
        <div>
          <img src={item.img} alt="productImg" className="w-[100px] h-full bg-cover bg-center object-cover" loading='lazy' />
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


// MainOrder

const Item  = ({orderdetail ,seeAll})=>{


  const {username,product_id,totalPrice, img ,qty} = orderdetail;


      return(
        <div className="border border-[var(--secondarycolor)] rounded-2xl shadow-md hover:shadow-lg relative">
            
            <img src={img} alt="demo"  className=" w-full h-[300px]   bg-center bg-cover object-cover rounded-t-2xl " loading='lazy'/>
           
            <div className=" px-2 sm:px-4 py-4 sm:py-8  flex flex-col  gap-4   ">

                <div className="flex  justify-between items-center  ">
                    {/* title */}
                   <div>
                   <FastfoodIcon/>
                    <h2 className='sm:text-2xl font-semibold'>{username}</h2>
                    <h2>{product_id}</h2>
                   </div>
                   {/* rating */}
                   <div className='flex  flex-row  items-center justify-center gap-1 bg-green-600 text-white  p-2'>
                    <StarIcon/>
                    <span className='text-xs sm:text-sm'>5 star</span>
                   </div>

                </div>

                <div className="flex gap-3 ">
                    
                    <div className="flex gap-2 items-center">
                    <SellIcon/>
                    <span>{`Rs.${totalPrice}(${qty} items)`}</span>
                    </div>
                  
                   
                </div>

                
                <button className="bg-[var(--primarytext)]  text-[var(--neutral)] px-4 py-2 rounded-md font-medium  w-full text-sm hover:scale-90 transition ease-in-out duration-300" onClick={seeAll}>See all</button>

            </div>

         </div>
        
    )
      
}