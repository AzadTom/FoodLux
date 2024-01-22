import { useSelector,useDispatch } from 'react-redux';
import ProductCard from '../../components/Products/ProductCard.jsx';
import {addTocart} from '../../reducers/cartSlice.js';

import LocalMallIcon from '@mui/icons-material/LocalMall';
import FavoriteIcon from '@mui/icons-material/Favorite';

import {addToFav,removeToFav} from '../../reducers/favSlice.js'

import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

const SearchPage = ()=>{


    const {filterData} = useSelector((state)=>state.filterData);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    
    const {wishData} = useSelector((state)=>(state.favData));

    const {token} = useSelector((state)=>(state.token));

    
    const showToast = (content,icon)=>
      {
 
         toast(content,{
             icon:icon,
             position:'top-center'
         })
 
      }


    const add =(item)=>{


      if(!token)
      {
        return navigate("/signin");
      }

      dispatch(addTocart({item,token:token.token}));
      showToast("add to cart!", <div><LocalMallIcon/></div> );

    }

   const addRemoveToFav = (product)=>{


      if(!token)
      {
        return navigate("/signin");
      }

      const isFound =  wishData.find((item)=>(item.id == product.id));

      if(isFound)
      {
         dispatch(removeToFav(product));
         showToast("remove to wishlist!", <div><FavoriteIcon/></div> );
      }
      else
      {

         dispatch(addToFav(product));
         showToast("add to wishlist!", <div><FavoriteIcon/></div> )
      }



   }



    return(
        <>
         <section className="flex flex-col gap-4 justify-center items-center p-2">
         <div className="grid grid-cols-1   sm:grid-cols-2  md:grid-cols-3  gap-2 sm:gap-4 justify-between   items-center max-w-[1000px]">
         {filterData.map((item)=>(<ProductCard {...item} key={item.id} add={()=>add(item)} addRemoveToFav={()=> addRemoveToFav(item)}/>))}
         </div>
        </section>
        </>
    )
}

export default SearchPage;