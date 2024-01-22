import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';


const Counter = ({item})=>{

   
    const [product,setProduct] = useState(item);

    const dispatch = useDispatch();



    


    const increment = (e)=>{

        e.preventDefault();
         

        setProduct((prev)=>({
            ...prev,
            qty:prev.qty>=1? prev.qty+1:1,
         }))

        


    }


    const decrement = (e)=>{

        

         e.preventDefault();

         setProduct((prev)=>({
            ...prev,
            qty: prev.qty<=1?1:prev.qty-1,
         }))

         

        

    }

    return(
        <>
        <div className='flex gap-1 items-center justify-center border border-[var(--primarytext)] '>
            <button onClick={decrement}><RemoveIcon/></button>
            <span>{product.qty}</span>
            <button onClick={increment}><AddIcon/></button>
        </div>
        </>
    )

}

export default Counter;

