import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../components/Products/ProductCard';
import { addTOfav,removeTofav } from '../../reducers/favSlice';
import { addTocart } from '../../reducers/cartSlice';
import { useNavigate } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';





const Wishlist = ()=>{


    const {wishData} = useSelector((state)=>(state.favData));

    const {token} = useSelector((state)=>(state.token));

    const navigate = useNavigate();


     const dispatch = useDispatch();

   

     
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
           dispatch(removeTofav({id:product._id,token:token.token}));
           
        }
        else
        {

           dispatch(addTOfav({item:product,token:token.token}));
           
        }



     }


     if(wishData.length==0)
     {
      return (<div className='w-full h-[80vh] text-center flex flex-col  gap-2 justify-center items-center '> <h1 className="text-3xl font-semibold">FoodLux</h1><h2>Wishlist is empty!</h2> <button className="px-4 py-2 bg-black text-white" onClick={()=> navigate("/")}>Continue</button></div>)

     }

    return(
        <>
         <section className="flex flex-col gap-4 justify-center items-center p-2">
         <div className="grid grid-cols-1   sm:grid-cols-2  md:grid-cols-3  gap-2 sm:gap-4 justify-between   items-center max-w-[1000px]">
         {wishData.map((item)=>(<ProductCard {...item} key={item.id} add={()=>add(item)} addRemoveToFav={()=> addRemoveToFav(item)}/>))}
         </div>

        </section>
        </>
    )
}


export default Wishlist;