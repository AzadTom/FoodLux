import { useSelector,useDispatch } from 'react-redux';
import ProductCard from '../../components/Products/ProductCard.jsx';
import {addTocart} from '../../reducers/cartSlice.js';

import LocalMallIcon from '@mui/icons-material/LocalMall';


import {addTOfav,removeTofav} from '../../reducers/favSlice.js'


import { useNavigate } from 'react-router-dom';
import NewProductItem2 from '@/components/Products/NewProductItem2.jsx';

const SearchPage = ()=>{

    const {filterData} = useSelector((state)=>state.filterData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return(
        <>
         <section className="flex flex-col gap-4 justify-center items-center p-2">
         <div className="grid grid-cols-1   sm:grid-cols-2  md:grid-cols-4  gap-2 sm:gap-4 justify-between   items-center px-5">
         {filterData.map((item)=>(<NewProductItem2 {...item} />))}
         </div>
        </section>
        </>
    )
}

export default SearchPage;