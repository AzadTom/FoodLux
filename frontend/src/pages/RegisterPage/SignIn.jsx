import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Others/Input';

import {useDispatch ,useSelector} from 'react-redux';
import { signIn} from '../../reducers/userSlice.js';

function SignIn() {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {status,user} = useSelector((state)=>(state.user))


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


  const submitForm = (e)=>{

      e.preventDefault();

      dispatch(signIn(userDetails))

  }


  if(status=="loading")
  {

     return(
       <div className='w-full h-screen flex justify-center items-center'>
           <span>Loading...</span>
       </div>
     )
  }


  if(user)
  {

    console.log(user)
    navigate("/home");

  }



  return (
    <div className='flex    items-center justify-center   w-full h-screen  '>

            
         <form className='max-w-[800px]  flex flex-col justify-center    p-[2rem] gap-4 rounded-md ' onSubmit={submitForm}>

               
                <h2 className='text-xl  '>LogIn </h2>

             

              {inputs.map((input)=>(
                <Input key={input.id} {...input} onchange={onchanage} value={userDetails[input.name]} />
              ))
            } 
          <div className='flex flex-col justify-center   gap-2 '>
          <button className='px-[20px] py-[10px] bg-black text-white rounded-md' type='submit'>Sign In</button>
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