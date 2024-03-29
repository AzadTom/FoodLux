import { Suspense ,lazy} from "react";
import { Routes,Route } from "react-router-dom";


// other components
import Header from "./components/Header/Header";
import Loading from "./components/Others/Loading";
import ThemeButton from './components/Theme/ThemeButton';




// pages components
const Home  = lazy(()=> import("./pages/HomePage/Home"));
const HomePage =  lazy(()=> import("./pages/HomePage/HomePage"));
const SignUp = lazy(()=> import("./pages/RegisterPage/SignUp"));
const SignIn = lazy(()=> import("./pages/RegisterPage/SignIn"));
const Cart  = lazy(()=> import("./pages/CartPage/CartPage"));
const Checkout = lazy(()=> import("./pages/CheckoutPage/Checkout"));
const Success  = lazy(()=> import("./pages/CheckoutPage/Success"));
const Failed  = lazy(()=> import("./pages/CheckoutPage/Failed"));
const SearchPage = lazy(()=>import("./pages/SearchPage/SearchPage"));
const Wishlist = lazy(()=> import("./pages/WishlistPage/Wishlist"));
const NotFound = lazy(()=> import("./pages/NotFoundPage/NotFound"));





function App() {

  

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Suspense fallback={<Loading/>}><Home/></Suspense>} >
          <Route  path="home" element={<Suspense fallback={<Loading/>}><HomePage/></Suspense>} /> 
          <Route  path="searching" element={<Suspense fallback={<Loading/>}><SearchPage/></Suspense>}/> 
      </Route>
      <Route path="/signup" element={<Suspense fallback={<Loading/>}><SignUp/></Suspense>}/>
      <Route path="/signin" element={<Suspense fallback={<Loading/>}><SignIn/></Suspense>}/>
      <Route path="/cart" element={<Suspense fallback={<Loading/>}><Cart/></Suspense>}/>
      <Route path="/checkout/:coupan1/:coupan2" element={<Suspense fallback={<Loading/>}><Checkout/></Suspense>}/>
      <Route path="/paymentsuccess" element={<Suspense fallback={<Loading/>}><Success/></Suspense>}/>
      <Route path="/paymentfailure" element={<Suspense fallback={<Loading/>}><Failed/></Suspense>}/>
      <Route path="/search" element={<Suspense fallback={<Loading/>}><SearchPage/></Suspense>}/>
      <Route path="/fav" element={<Suspense fallback={<Loading/>}><Wishlist/></Suspense>}/>
      <Route path="*" element={<Suspense fallback={<Loading/>}><NotFound/></Suspense>}/>
    </Routes>
    <ThemeButton/>
    </>
  );
}

export default App;
