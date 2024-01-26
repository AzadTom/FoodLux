import React from 'react'
import OrderItem from '../../components/Order/OrderItem'

function OrderPage() {

   
    
   const Orders  = Array.from({length:12},(_,index)=>{
      <OrderItem/>
   }) 

  return (
    <>
    <div>OrderPage</div>
     {Orders}
    </>
    
  )
}

export default OrderPage