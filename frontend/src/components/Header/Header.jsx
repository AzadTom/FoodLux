import { useNavigate } from "react-router-dom";
import LocalMallIcon from '@mui/icons-material/LocalMall';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector ,useDispatch} from "react-redux";
import {getFilter} from '../../reducers/filterSlice.js';
import { useState } from "react";
import { Favorite } from "@mui/icons-material";



const Header=()=>{


    const navigate = useNavigate();
    const dispatch = useDispatch();



    const {token} = useSelector((state)=>(state.token));
    const {cart} = useSelector((state)=>(state.cart));

    const {wishData} = useSelector((state)=>(state.favData));

    const {products} = useSelector((state)=>(state.product));


    
    
    const goToHome = (e)=>{

         e.preventDefault();
         

        if(token)
        {
            navigate("/profile");
        }
        else
        {
            navigate("/signin");
        }

    }


    const searchPage = (e)=>{

       
           e.preventDefault();

            const filtered =  products.filter((product) => {
            const productName = product.name.toLowerCase();
            return productName.includes(e.target.value.toLowerCase());

          });
        
           dispatch(getFilter(filtered));
          
           navigate("/search");
       

         

    }


    return(
        <>
        <div className="flex justify-between p-4 items-center cursor-pointer ">
            <div onClick={()=> navigate("/home")}>
                <h1 className="font-bold text-2xl">FoodLux</h1>
            </div>
            <div className="flex  gap-4">
                 <div className="hidden sm:flex gap-1 items-center">
                    <input type="search" placeholder="Search" className="px-4 py-2 bg-[var(--secondarycolor)] outline-none rounded-xl "  onChange={(e)=> searchPage(e)}  />
                 </div>
                 <button onClick={()=> navigate("/fav")}>
                    <Favorite/>
                    <span className="text-xs">{wishData.length>0 ? (wishData.length):("")}</span>
                 </button>
                 <button className="flex justify-center items-center " onClick={()=> navigate("/cart")}>
                    <LocalMallIcon/>
                    <span className="text-xs">{cart.length>0 ? (cart.length):("")}</span>
                   </button>
                <button onClick={goToHome}><AccountCircleIcon/></button>
            </div>
        </div>
       
        </>
    )

}

export default  Header;