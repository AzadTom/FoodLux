const BlogCard=({index,img})=>{



    return(
        <>
        <div className="flex justify-center items-center relative "> 
        <img src={img} alt="blog"  className=" w-full h-[300px]   bg-center bg-cover object-cover  rounded-2xl" loading="lazy"/>
            <h2 className="absolute text-8xl font-semibold z-10 text-white">{index+1}</h2>
        </div>
        </>
    )

}


export default BlogCard;