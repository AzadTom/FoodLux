import React from 'react'
import Products from '../../components/Products/Products';
import Cta from '../../components/Cta/Cta';
import Blogs from '../../components/Blogs/Blogs';
import Faq from '../../components/Faq/Faq';
import HeroSection from '../../components/HeroSection/HeroSection';
import Footer from '../../components/Footer/Footer';

const HomePage  = ()=>{

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