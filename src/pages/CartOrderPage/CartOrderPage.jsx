import React, { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

function CartOrderPage() {


    const navigate  = useNavigate();


    useEffect(()=> navigate("cartpage"),[]);


  return (
    <>
     <CartOrderHeader/>
     <Outlet/>
    </>
  )
}

export default CartOrderPage

const CartOrderHeader  = ()=>{


    const navigate  = useNavigate();

    const [line,setLine] = useState(false);


    const onChangeState = (num)=>{



        setLine((prev)=>(!prev))

       if(num == 1)
       {
        
        navigate("cartpage")
       }
       else
       {
        navigate("orderpage")
       }

       
        
       
      
    }

    useEffect(()=>{


      setLine(true);

    },[])
    

    return(
       
        <div className='w-full flex justify-between sticky top-0 font-semibold  my-2 px-4'>
        <button onClick={ ()=> onChangeState(1)}  className={line? "flex-1  border-b-2 border-[var(--border)]":"flex-1"}>Carts</button>
        <button onClick={()=> onChangeState(2)} className={line? "flex-1":"flex-1  border-b-2 border-[var(--border)]"}>Orders</button>
        </div>
        
    )
}