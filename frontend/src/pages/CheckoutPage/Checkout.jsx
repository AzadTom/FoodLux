import React, { useState } from 'react'
import {useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { razorPayHandler } from '../../utils/razoPayHandler.js';

function Checkout() {



    const navigate  = useNavigate();

    const {coupan1,coupan2} = useParams();

    

    const getDiscount = ()=>{

       let total = 0;

       if(coupan1 == "true")
       {
         total+=50;
       }

       if(coupan2 == "true")
       {
         total+=50;
       }

       return total;
    }

   

    const randomAddresses = [
        {
           name:"Jack",
          street: "123 Main Street",
          city: "Cityville",
          state: "Stateonia",
          postalCode: "12345",
          country: "Fictionland"
        },
        {
          name:"Ronaldo",
          street: "456 Elm Avenue",
          city: "Townburg",
          state: "Regionville",
          postalCode: "67890",
          country: "Imaginaria"
        },
        {
          name:"Messi",
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


      razorPayHandler();

  }


  const[address,setAddress] = useState( {
    name:"",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: ""
  })

  const [openAdd,setOpenAdd] = useState(false);

   const selectAddress = (item)=>{

     setOpenAdd(true);
     setAddress(item);

   }

  return (
    <div className='flex  flex-col justify-center  items-center '>

          <h2 className='text-2xl font-semibold text-center'><ShoppingBasketIcon/></h2>
      <div className='flex w-full sm:max-w-[1000px]  flex-col sm:flex-row  items-center sm:items-start  justify-center '>

      <div className='flex flex-col gap-2  px-4  py-4 justify-center items-center   max-w-[350px] w-full '>
         <h2 className='text-xl font-semibold text-center '>Select Address</h2>
        {randomAddresses.map((item)=>(<AddressItem address={item} key={item._id} onClick={ ()=> selectAddress(item)}/> ))}
      </div> 

         <div className='sm:max-w-[300px] w-full px-4 py-4 '>

         <h2 className='text-xl font-semibold text-center bg-[var(--secondarycolor)] py-4'>Order Details</h2>
        {cart.map((item)=>(<CheckoutItem item={item} key={item._id}/> ))}
         <hr />
         <div className='flex justify-between  text-md px-4  py-2 bg-[var(--secondarycolor)]'>
            <h2>Price Details:</h2>
            <h2>{`(${cart.length} items)`}</h2>
         </div>

         <div className='flex justify-between  text-md px-4  py-2 bg-[var(--secondarycolor)]'>
            {getDiscount() > 0 ? 
            ( 
              <>
               <h2>Discount:</h2>
               <h2>{getDiscount()}</h2>
              </>
            )
             :
            ("")  
            }

         </div>

         <div className='flex justify-between font-semibold text-md px-4  py-2 bg-[var(--secondarycolor)]'>
            <h2>Total:</h2>
            <h2>{`Rs.${subtotal}`}</h2>
         </div>
         <div className='flex justify-between  text-md px-4  py-2 bg-[var(--secondarycolor)]'>
            <h2>Delivery Charges:</h2>
            <h2>Free</h2>
         </div>
         <hr />
         <div className='flex justify-between font-semibold text-md px-4  py-2 bg-[var(--secondarycolor)]'>
            <h2>Total Amonut:</h2>
            <h2>{`Rs.${subtotal - getDiscount()}`}</h2>
         </div>
         <hr />

        {openAdd && (
           <div className='flex flex-col text-md px-4  py-2 bg-[var(--secondarycolor)]'>
           <h2 className='font-semibold'>{`Deliver to ${address.name}`}</h2>
             <h2><span>{address.street}</span> <span>{address.city}</span></h2>
             <h2><span>{address.state}</span> <span>{address.country}</span> <span>{address.postalCode}</span></h2>
        </div>
        )}

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
        <div className='flex  justify-between items-center sm:max-w-[300px] w-full px-4 py-2 bg-[var(--secondarycolor)] font-medium '>
             <span >{`${item.name}`}</span> 
             <span >{`${item.price}  × ${item.qty}`}</span>
        </div>
        </>
    )
}

const AddressItem  = ({address , onClick})=>{


    
  const [value,setValue] = useState("");

  const handleOptionChange = (event) => {
     setValue(event.target.value);
  };

    return (
        <>
         <div className='flex items-center py-2 px-4 justify-between bg-[var(--secondarycolor)] hover:bg-[var(--border)] hover:text-[var(--primarycolor)] text-[var(--primarytext)] sm:max-w-auto w-full' onClick={()=>onClick()}>
            <input type="radio"  value={address.name} checked={value === address.name}  onChange={handleOptionChange} onBlur={()=> setValue("")}/>
            <div>
               <h2 className='text-xl font-semibold'>{address.name}</h2>
              <h2><span>{address.street}</span> <span>{address.city}</span></h2>
              <h2><span>{address.state}</span> <span>{address.country}</span> <span>{address.postalCode}</span></h2>
            </div>
         </div>
        </>
    )

}