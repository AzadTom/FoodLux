import React, { useEffect } from 'react'
import Products from '../../components/Products/Products';
import Cta from '../../components/Cta/Cta';
import Blogs from '../../components/Blogs/Blogs';
import Faq from '../../components/Faq/Faq';
import HeroSection from '../../components/HeroSection/HeroSection';
import Footer from '../../components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../../reducers/cartSlice';
import { getfavs } from '../../reducers/favSlice';


const HomePage  = ()=>{
    


    const dispatch = useDispatch();
    const {token} = useSelector((state)=>(state.token));


    useEffect(()=>{

        token && dispatch(getCart(token.token));
        token && dispatch(getfavs(token.token));

    },[])
    return(
        <>
        <HeroSection/>
        <Products/>
        <Cta/>
        <Faq/>
        <Footer/>
        </>
    )
}


export default HomePage;