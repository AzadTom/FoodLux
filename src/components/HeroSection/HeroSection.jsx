import { useEffect, useState } from 'react';
import SlideCard from './SlideCard';
import  HeroVideo from  './HeroVideo';

const HeroSection = () => {



    const images = [

        "https://images.unsplash.com/photo-1605926637412-b0cd5a3e3543?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
        "https://images.unsplash.com/photo-1510195429239-8a5c0222144a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1605926637412-b0cd5a3e3543?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
        "https://images.unsplash.com/photo-1510195429239-8a5c0222144a?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8",
        
    ];


     const[curr,setCurr] = useState(0);

     const prev =()=> setCurr((curr)=> (curr===0?images.length-1:curr-1));

     const next=()=> setCurr((curr)=> (curr===images.length-1?0:curr+1));


      useEffect(()=>{

        const slideInterval =setInterval(next,3000);

        return ()=> clearInterval(slideInterval);

      },[])



    return (
       <section>

            <HeroVideo/>
            <h2 className='text-2xl font-semibold my-8 mx-4 flex flex-col gap-2 justify-center items-center'><span>Popular Food Item</span> <span className='text-xs font-thin bg-green-600 px-2 py-1 text-white'>This month</span></h2>
            <div className="flex   overflow-x-scroll w-full sm:p-8 sm:gap-4  sm:mx-0  rm-scroll">
            {images.map((item)=>(<SlideCard item={item} curr={curr} prev={()=> prev()} next={()=> next()}/>))}
            </div>

       </section>
    )
}

export default HeroSection;
