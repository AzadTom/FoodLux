import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Success() {

 

  const navigate  = useNavigate();

  useEffect(()=>{

    setTimeout(() => {
      
      navigate("/home");

    }, 2000);

  },[])


  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='w-[250px] h-[250px] rounded-full bg-green-600 text-white flex flex-col justify-center items-center'>
            <h2>Order Successful!</h2>
        </div>
    </div>
  )
}

export default Success