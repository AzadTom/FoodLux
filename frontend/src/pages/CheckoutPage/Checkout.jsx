import React from 'react'
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

function Checkout() {



    const navigate  = useNavigate();
    const randomAddresses = [
        {
          street: "123 Main Street",
          city: "Cityville",
          state: "Stateonia",
          postalCode: "12345",
          country: "Fictionland"
        },
        {
          street: "456 Elm Avenue",
          city: "Townburg",
          state: "Regionville",
          postalCode: "67890",
          country: "Imaginaria"
        },
        {
          street: "789 Oak Lane",
          city: "Villagetown",
          state: "Provinceland",
          postalCode: "98765",
          country: "Dreamland"
        }
      ];

  const {cart} = useSelector((state)=>(state.cart));

  const subtotal = cart.reduce((acc, item) => ((item.price) * (item.qty)) + acc, 0);

  const successToHome = ()=>{


    navigate("/success");

    setTimeout(()=>{

      navigate("/home");

    },2000);

  }

  return (
    <div className='flex justify-center'>

   
      <div className='flex w-full sm:max-w-[1000px]  flex-col sm:flex-row  items-start  justify-center'>

      <div className='flex flex-col gap-2  px-4  py-4 items-end  sm:max-w-[300px] w-full  '>
        {randomAddresses.map((item)=>(<AddressItem address={item} key={item._id}/> ))}
      </div> 

         <div className='sm:max-w-[300px] w-full px-4 py-4'>

         
         <div className='flex justify-between px-4 pt-4 bg-[var(--secondarycolor)]'>
            <h2>Product</h2>
            <h2>Price</h2>
         </div>
        {cart.map((item)=>(<CheckoutItem item={item} key={item._id}/> ))}

         <div className='flex justify-between font-semibold text-md px-4  py-4 bg-[var(--secondarycolor)]'>
            <h2>Subtotal</h2>
            <h2>{`Rs.${subtotal}`}</h2>
         </div>

         <button className='px-4 py-2 bg-[var(--border)] text-[var(--primarycolor)] w-full mt-4' onClick={successToHome}>Place Order</button>


        </div>

       </div> 

    </div>
  )
}

export default Checkout



const CheckoutItem  = ({item})=>{

    
    return(
        <>
        <div className='flex  justify-between items-center sm:max-w-[300px] w-full px-4 py-2 bg-[var(--secondarycolor)]'>
            <div className='w-[100px] h-full'>
                <img src={item.img} alt="productImg" />
                 <h2 className='whitespace-nowrap text-sm text-center'>{item.name}</h2>
            </div>
            <div>
                
                 <h2>{`Rs.${item.price}  ×  ${item.qty}`}</h2>
            </div>
        </div>
        </>
    )
}

const AddressItem  = ({address})=>{


    return (
        <>
         <div className='flex items-center py-2 px-4 justify-between bg-[var(--secondarycolor)] hover:bg-[var(--border)] hover:text-[var(--primarycolor)] text-[var(--primarytext)] sm:max-w-[300px] w-full' >
            <input type="radio" />
            <div>
              <h2><span>{address.street}</span> <span>{address.city}</span></h2>
              <h2><span>{address.state}</span> <span>{address.country}</span></h2>
              <h2>{address.postalCode}</h2>
            </div>
         </div>
        </>
    )

}