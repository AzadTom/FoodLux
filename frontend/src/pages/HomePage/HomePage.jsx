import React from 'react'
import Cta from '../../components/Cta/Cta';
import HeroSection from '../../components/HeroSection/HeroSection';
import Footer from '../../components/Footer/Footer';
import CategoryList from '@/components/Category/CategoryList';
import ProductContainer from '@/components/Products/ProductContainer';
import Faq from '../../components/Faq/Faq';
import { TestimonialsSection } from '@/components/Testimonial/Testimonial';

const HomePage  = ()=>{

    return(
        <>
        <HeroSection/>
        <CategoryList/>
        <ProductContainer/>
        <Cta/>
        <Faq/>
        <TestimonialsSection/>
        <Footer/>
        </>
    )
}


export default HomePage;