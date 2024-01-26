const Cta =()=>{


    return(
        <>
         <section className={`bg-[url("/hero.jpg")] bg-cover bg-center object-fit w-full h-[80vh] my-8 flex justify-center text-white`}>
            <div className="text-center flex flex-col gap-2 mt-24 justify-start items-center">
            <h2 className="text-2xl sm:text-3xl font-medium">What are you looking for?</h2>
            <h3 className="font-bold">Call us at</h3>
            <button className="bg-green-600 text-white  px-4 py-2 rounded-md font-semibold">+91 93-108-55758</button>
            </div>
         </section>
        </>
    )

}


export default Cta;