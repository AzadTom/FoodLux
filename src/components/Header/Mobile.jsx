import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getFilter} from '../../reducers/filterSlice.js';


const Mobile =()=>{




    const navigate = useNavigate();
    const dispatch = useDispatch();

    

    const {products} = useSelector((state)=>(state.product));

    const searchPage = (e)=>{

       
        e.preventDefault();

         const filtered =  products.filter((product) => {
         const productName = product.name.toLowerCase();
         return productName.includes(e.target.value.toLowerCase());

       });
     
        dispatch(getFilter(filtered));
    
        navigate("/searching");
    

      

 }

    return(
       <>
        <div className="sm:hidden mx-4 mb-4">
        <input type="search"  className="w-full px-4 py-2 rounded-xl bg-[var(--secondarycolor)] outline-none" placeholder="Search" onChange={(e)=> searchPage(e)}/>
        </div>
       </>
    )

}


export default Mobile;