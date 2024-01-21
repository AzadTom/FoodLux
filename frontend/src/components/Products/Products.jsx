import ProductCard from "./ProductCard";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {demo} from '../../utils/demo.js';
import {useDispatch ,useSelector} from 'react-redux';
import  {productsData} from '../../reducers/productSlice.js';
import  {addtocart}from '../../reducers/cartSlice.js';
import { useEffect } from "react";
import {addToFav,removeToFav} from '../../reducers/favSlice.js'

import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteIcon from '@mui/icons-material/Favorite';

import toast from "react-hot-toast";
const Products = ()=>{


    

      const dispatch = useDispatch();

      const {products,status} = useSelector((state)=>(state.product));

      const {wishData} = useSelector((state)=>(state.favData));



      


      const add =(item)=>{

        dispatch(addtocart(item));
        

      }

     const addRemoveToFav = (product)=>{


        const isFound =  wishData.find((item)=>(item.id == product.id));

        if(isFound)
        {
           dispatch(removeToFav(product));
           
        }
        else
        {

           dispatch(addToFav(product));
           
        }



     }

      useEffect(()=>{
        dispatch(productsData());
      },[])


      if(status==="loading")
      {
        return ( <div className="w-full text-center h-8">Loading...</div> )
      }

    return(
        <>
        <div className="flex  justify-between   mx-4 my-8">
            <h2 className="text-2xl font-semibold">Our Popular Food Items</h2>
            <h1 className="hidden sm:flex  items-center gap-4"><span>Explore All</span><ArrowForwardIcon/></h1>
        </div>
        <section className="flex flex-col gap-4 justify-center items-center p-2">
         <div className="grid grid-cols-1   sm:grid-cols-2  md:grid-cols-3  gap-2 sm:gap-4 justify-between   items-center max-w-[1000px]">
         {products.map((item)=>(<ProductCard {...item} key={item.id} add={()=>add(item)} addRemoveToFav={()=> addRemoveToFav(item)}/>))}
         </div>

        </section>
        
        </>
    )

}

export default Products;