import BlogCard from "./BlogCard";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {useSelector} from 'react-redux';

const Blogs=()=>{


     const blogs = useSelector((state)=>(state.product.products));
   
    return(
        <>
         <div className="flex  justify-between   mx-4 my-8">
            <h2 className="text-2xl font-semibold">Our Food Blogs</h2>
            <h1 className="hidden sm:flex  items-center gap-4"><span>Explore All</span> <ArrowForwardIcon/></h1>
        </div>
        <section className="flex flex-col gap-4 justify-center items-center p-4">
         <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3   gap-4 justify-between   items-center max-w-[1000px]">
         {
            blogs.map((item,index)=>
            (
                <BlogCard {...item}  index={index} key={item.id}/>
            ))
         }
         </div>

        </section>
        </>
    )

}


export default Blogs;