import React, { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Others/Input';

import {useDispatch ,useSelector} from 'react-redux';
import { signIn ,setUserNull} from '../../reducers/userSlice.js';
import { setToken } from '../../reducers/tokenSlice.js';

import {Loader} from '../../components/Others/Loading.jsx';

function SignIn() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {status,user} = useSelector((state)=>(state.user))

  const[loader1,setLoader1] = useState(false);
  const[loader2,setLoader2] = useState(false);


    const [userDetails,setUserDetails] = useState({
      email:"",
      password:"",
      
    });




    const inputs = [
  {

    id :4,
    name:"email",
    label:"Email",
    type:"email",
    placeholder:"Email",
   
},
  {

    id :5,
    name:"password",
    label:"Password",
    type:"password",
    placeholder:"Password",
  
}
  ];



  const onchanage = (e)=>{

      setUserDetails({...userDetails,[e.target.name]:e.target.value});
      
  }

  useEffect(()=>{

    dispatch(setUserNull());

 },[])


  const submitForm = (e)=>{

      e.preventDefault();

       setLoader1(true);
        
      dispatch(signIn(userDetails))

  }

   const submitGuestUser = (e)=>{

    
      e.preventDefault();

      setLoader2(true);

      setUserDetails({
        email:"kumarazad2918@gmail.com",
        password:"Qwer1234",
      });

      dispatch(signIn({email:"kumarazad2918@gmail.com",password:"Qwer1234"}));

   }


  
   const openSignin = ()=>{

    dispatch(setUserNull());
    setUserDetails({
      email:"",
      password:"",
      
    })
    
    
   }


  if(status=="error")
    {
       console.log(user)
        
      return (<div className='flex flex-col justify-center items-center h-screen'>
                 <div>{user}</div>
                 <button className='px-4 py-2 rounded-md bg-green-600 text-white' onClick={()=> openSignin()}>SignIn</button>
           </div> )
    }
    else
    {
      if(user)
      {

      const token  = JSON.stringify(user); 
      localStorage.setItem("token",token);
      dispatch(setToken(user));
      navigate("/home");

      }

    }



  return (
    <div className='flex    items-center justify-center   w-full h-screen  '>

            
         <form className='max-w-[800px]  flex flex-col justify-center    p-[2rem] gap-4 rounded-md ' onSubmit={submitForm}>

               
                <h2 className='text-xl'>LogIn </h2>

             

              {inputs.map((input)=>(
                <Input key={input.id} {...input} onchange={onchanage} value={userDetails[input.name]} />
              ))
            } 
          <div className='flex flex-col justify-center   gap-2 '>
            <div className='flex flex-col gap-4'>
            <button className='px-[20px] py-[10px] bg-black text-white rounded-md flex justify-center items-center' type='submit'>{loader1 ? <Loader/>:"Log In"}</button>
            <button className='px-[20px] py-[10px] bg-black text-white rounded-md flex justify-center items-center' onClick={submitGuestUser}>{loader2 ? <Loader/>:"LogIn As Guest"}</button>
            </div>
            <p className='text-center cursor-pointer' onClick={()=> navigate("/signup")}>Don't have an account? SignUp</p>
          </div>
            <div className='flex  flex-col  justify-center text-center gap-2  '>
                     <span className='text-sm text-gray-400'>OR</span>
                <button className='px-[20px] py-[10px] bg-black text-white rounded-md flex  justify-center  gap-1 '> <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="google" width={24} height={24} /></button>
                </div>
         </form>

    </div>
  )
}

export default SignIn;