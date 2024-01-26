import React, { useEffect, useState } from 'react'
import OrderItem from '../../components/Order/OrderItem'
import {ServiceOrders} from '../../services/service.js';
import { useSelector } from 'react-redux';


function OrderPage() {

   


    const {token} = useSelector((state)=>(state.token));

    const [orders,setOrder] = useState([]);


    const getOrders  = async()=>{


      const data  = await ServiceOrders(token.token);

      setOrder(data.orders);

      console.log(data);

    }

    useEffect(()=>{

     
      getOrders();

    },[]);
    
   
  return (
    <>
    <div className='flex justify-center items-center'>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 max-w-[1000px] w-full'>
     {orders.map((item)=>(<OrderItem item={item}/>))}
     </div>

    </div>
    </>
    
  )
}

export default OrderPage