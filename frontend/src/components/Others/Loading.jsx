

const Loading =()=>{



    return(
        <>

           <div className="flex justify-center items-center w-full">


                <button className="flex gap-2 px-4 py-2 flex-col justify-center items-center">
                    <span className="animate-spin p-4 rounded-[50%] border-4 border-[#a2a2a2] border-t-white"></span>
                    <span>Loading</span>
                </button>

            </div> 

        </>
    )

}

export default Loading;

export const Loader = ()=>{

     return(
        <button className="flex gap-2flex-col justify-center items-center">
           <span className="animate-spin p-2 rounded-[50%] border-2 border-[#a2a2a2] border-t-white"></span>
        </button>
     )
}