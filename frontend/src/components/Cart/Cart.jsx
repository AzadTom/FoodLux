import { useDispatch, useSelector } from 'react-redux';
import { removetocart, setStatus } from '../../reducers/cartSlice.js';
import CartCard from './CartCard.jsx';
import LocalMallIcon from '@mui/icons-material/LocalMall';


import toast from "react-hot-toast";

const Cart = () => {



    const dispatch = useDispatch();


    const { cart} = useSelector((state) => (state.cart));

    const showToast = (content,icon)=>
     {

        toast(content,{
            icon:icon,
            position:'top-center'
        })

     }



    const remove = (item) => {


       
        dispatch(removetocart(item));
         showToast("remove to cart!", <div><LocalMallIcon/></div> );
       

    }

    



   



    return (
        <>
          
            <table class="table-auto text-[var(--secondarytext)]">
                <thead  className='text-[var(--primarytext)] font-semibold text-left'>
                    <tr>
                        <th className=" px-4 py-4">Product</th>
                        <th className=" px-4 py-4">Title</th>
                        <th className=" px-4 py-4">Price</th>
                        <th className=" px-4 py-4 hidden sm:block">Quantity</th>
                        <th className=" px-4 py-4 hidden">Remove</th>
                    </tr>
                </thead>
                <tbody  className='text-[var(--secondarytext)]'>
                 {cart.map((item)=>(<CartCard item={item} key={item.id} remove={()=> remove(item)}/>))}
                </tbody>
            </table>
        </>)

}

export default Cart;


