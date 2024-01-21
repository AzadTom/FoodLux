import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import Model from "./Model";

const OrderSummary = () => {




  const { cart } = useSelector((state) => (state.cart));

  const subtotal = cart.reduce((acc, item) => ((item.price) * (item.qty)) + acc, 0);



  const[model,setModel]= useState(false);

  const [coupan1,setCoupan1]= useState(false);
  const [coupan2,setCoupan2]= useState(false);

  const showCloseModel=(e)=>{

    setModel((prev)=>(!prev));   
 }



   const closeModel=(e)=>{


    setModel((prev)=>(!prev));
   
   
 }

 





 

  const CoupanModel = (
     <Model closeModel={showCloseModel}>
       <div onClick={(event)=> event.stopPropagation() }>
            <h2 className="font-semibold">Apply Coupon</h2>

      <div className="shadow-md p-2">

        <div className="flex gap-2">
        <input type="checkbox" name="check1" id="check1"   checked={coupan1} onChange={()=> setCoupan1((prev)=>(!prev))}/>
        <label htmlFor="check1">Seasonal Offer</label>
        </div>

        <p>Get a refrsh discount of ₹50 on your orders! Brighten up your shopping.</p>
      </div>

      <div className="shadow-md p-2">

        <div className="flex gap-2">
        <input type="checkbox" name="check2" id="check2" checked={coupan2} onChange={()=> setCoupan2((prev)=>(!prev))} />
        <label htmlFor="check2">Seasonal Offer</label>
        </div>

        <p>Get a refrsh discount of ₹50 on your orders! Brighten up your shopping.</p>
      </div>
      <button onClick={closeModel} className="px-4 py-2 bg-black text-white w-full">Apply</button>
       </div>
     </Model>
  );

 
 

  const totalCoupan = (coupan1,coupan2)=>
  {

     let total =0;

     if(coupan1)
     {
        total+=50;
     }

     if(coupan2)
     {
       total+=50;
     }

     return total;


  }
  
  const coupans =  totalCoupan(coupan1,coupan2);


  return (
    <>

      <div className="flex flex-col gap-4 px-4 py-2  bg-[var(--primarycolor)]">
        <h2 className="font-semibold">Order summary</h2>
        <h1 className="font-semibold cursor-pointer" onClick={showCloseModel}>Apply coupan</h1>
        {model && CoupanModel}
        {(coupan1 || coupan2) &&  <div className="flex justify-between w-full gap-4">
          <span>Coupan</span>
          <span>{`Rs.${coupans}`}</span>
        </div> }
        <div className="flex justify-between w-full gap-4">
          <span>Sub total</span>
          <span>{`Rs.${subtotal}`}</span>
        </div>
        <div className="flex justify-between w-full gap-4">
          <span>Total</span>
          <span>{`Rs.${subtotal-coupans}`}</span>
        </div>
        <button className="px-4 py-2 bg-[var(--border)] text-[var(--neutral)] ">Checkout</button>
      </div>



    </>
  )

}


export default OrderSummary;

