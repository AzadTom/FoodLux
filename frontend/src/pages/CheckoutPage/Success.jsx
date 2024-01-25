import React from 'react'

import  { useSearchParams} from 'react-router-dom';

function Success() {

  const searchQuery  = useSearchParams()[0];

  const referenceNumber = searchQuery.get("reference");

  return (
    <div className='flex justify-center items-center w-full h-screen'>
        <div className='w-auto h-auto rounded-full bg-green-600 text-white flex flex-col justify-center items-center'>
            <h2>Order Successful!</h2>
              <p>Reference id.${referenceNumber}</p>
        </div>
    </div>
  )
}

export default Success