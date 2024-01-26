import Mobile from '../../components/Header/Mobile';


import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


const Home = ()=>{


   const navigate =  useNavigate();


   useEffect(()=>{

    navigate("/home");

   },[])



   
    return(
       <>
       <Mobile/>
       <Outlet/>
       </>
      )


}

export default Home;


