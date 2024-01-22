import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {incrementDecrementCart} from '../../reducers/cartSlice.js';


const Counter = ({item})=>{

   
    const [product,setProduct] = useState(1);

    const dispatch = useDispatch();



     const {token} = useSelector((state)=>(state.token));
     

    
    const increment = (e)=>{

        e.preventDefault();
         

        setProduct((prev)=>(prev>=1? prev+1:1))


         setTimeout(() => {
            

            if(product>1)
            {
               dispatch(incrementDecrementCart({item:product,token:token.token,id:item._id}));
               console.log(product);
            }

         }, 1000);

        


    }


    const decrement = (e)=>{

        

         e.preventDefault();

         setProduct((prev)=>(prev<=1?1:prev-1))

         setTimeout(() => {
            
             if(product>1)
             {
                dispatch(incrementDecrementCart({item:product,token:token.token,id:item._id}));
             }
            
         }, 1000);

         

        

    }

    return(
        <>
        <div className='flex gap-1 items-center justify-center border border-[var(--primarytext)] '>
            <button onClick={decrement}><RemoveIcon/></button>
            <span>{item.qty}</span>
            <button onClick={increment}><AddIcon/></button>
        </div>
        </>
    )

}

export default Counter;

