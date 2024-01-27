import ProductCard from "./ProductCard";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useDispatch ,useSelector} from 'react-redux';
import  {productsData} from '../../reducers/productSlice.js';
import  { addTocart, getCart ,setCartNull}from '../../reducers/cartSlice.js';
import { useEffect, useState } from "react";
import {addTOfav,getfavs,removeTofav ,setWishlistToNull} from '../../reducers/favSlice.js'
import Loading from '../Others/Loading.jsx';
import { useNavigate } from "react-router-dom";

const Products = ()=>{

     const navigate = useNavigate();
      const dispatch = useDispatch();

      const {products,status} = useSelector((state)=>(state.product));

      const {wishData} = useSelector((state)=>(state.favData));

      

      

      const {token} = useSelector((state)=>(state.token));

   
      const add =(product)=>{

         if(!token)
         {
           return navigate("/signin");
         }

         const data  = {id:product._id ,name:product.name,img:product.img,category:product.category,price:product.price,qty:product.qty}

         console.log(data);

        dispatch(addTocart({item : data,token:token.token}));
        

      }

     const addRemoveToFav = (product)=>{

          if(!token)
          {
            return navigate("/signin");
          }

        

  

         const isFound =  wishData.find((item)=>(item.id == product._id));


        if(isFound)
        {
           dispatch(removeTofav({id:product._id,token:token.token}));
           
        }
        else
        {

           const data = {id:product._id ,name:product.name,img:product.img,category:product.category,price:product.price,qty:product.qty}

           console.log(data);
           dispatch(addTOfav({item:data,token:token.token}));
           
        }



     }

      useEffect(()=>{
        dispatch(productsData());
      },[])


      if(status==="loading")
      {
        return ( <div className="w-full text-center h-16  bg-white"><Loading/></div> )
      }

    return(
        <>
        <div className="flex  justify-between   mx-4 my-8">
            <h2 className="text-2xl font-semibold">Our Popular Food Items</h2>
            <h1 className="hidden sm:flex  items-center gap-4"><span>Explore All</span><ArrowForwardIcon/></h1>
        </div>
        <section className="flex flex-col gap-4 justify-center items-center p-2">
         <div className="grid grid-cols-1   sm:grid-cols-2  md:grid-cols-3  gap-2 sm:gap-4 justify-between   items-center max-w-[1000px]">
         {products.map((item)=>(<ProductCard {...item} key={item._id} add={()=>add(item)} addRemoveToFav={()=> addRemoveToFav(item)}/>))}
         </div>

        </section>
        
        </>
    )

}

export default Products;