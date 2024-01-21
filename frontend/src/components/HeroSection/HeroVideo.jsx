

const VideoCta=()=>{


    return(
        <>
        <div className="relative mx-4  ">
        <video src="/video.mp4" autoPlay loop muted  className="w-full h-[50vh]  sm:h-[80vh] object-cover rounded-2xl border border-[var(--secondarycolor)]"></video>
        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 text-white">
            <h2 className="sm:text-8xl font-bold text-5xl">FoodLux</h2>
            <h3 className="sm:text-xl font-medium text-sm">Welcome to Our near Outlets!</h3>
            <button className="px-4 py-2 bg-green-600 rounded-2xl">Explore</button>
        </div>
        </div>
        
        </>
    )
}


export default VideoCta;
