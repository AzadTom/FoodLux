import { useDispatch, useSelector } from "react-redux";
import Cart from "../../components/Cart/Cart";
import OrderSummary from "../../components/Cart/OrderSummary";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCart } from "../../reducers/cartSlice.js";
import Loading from  '../../components/Others/Loading.jsx';

const CartPage = ()=>{



     const navigate = useNavigate();
     const dispatch = useDispatch();


     const [loading,setLoading] = useState(false);

    const { cart } = useSelector((state) => (state.cart));


    const {token} = useSelector((state)=>(state.token));

    
    
    useEffect(()=>{

        setLoading(true);
        dispatch(getCart(token.token));
        setLoading(false);

        console.log(cart);

    },[])



    if(loading)
    {
         console.log("loading");

        return( <div className="w-full h-[80vh] text-center flex flex-col  gap-2 justify-center items-center "><Loading/></div> )
    }
   
    

        if (cart.length === 0) {

            console.log("cartlength",cart.length);
            return (<div className='w-full h-[80vh] text-center flex flex-col  gap-2 justify-center items-center '> <h1 className="text-3xl font-semibold">FoodLux</h1><h2>Cart is empty!</h2> <button className="px-4 py-2 bg-black text-white" onClick={()=> navigate("/")}>Continue</button></div>)
        }


    

    


    return(
        <section className="flex justify-center items-center">
            
            <div className="max-w-[1000px] flex flex-col gap-8 sm:flex-row">
            <Cart/>
            <OrderSummary/>
                
            </div>
        </section>
    )
}

export default CartPage;