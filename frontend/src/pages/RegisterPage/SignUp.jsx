import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../../components/Others/Input.jsx';
import { validateUserDetail } from '../../utils/validate.js'; 
import {useDispatch ,useSelector} from 'react-redux';
import { signUp ,setUserNull} from '../../reducers/userSlice.js';
import { setToken } from '../../reducers/tokenSlice.js';
import {Loader} from '../../components/Others/Loading.jsx';


function SignUp() {

  const navigate = useNavigate();

   const dispatch = useDispatch();

   const {status,user} = useSelector((state)=>(state.user))



    const [userDetails,setUserDetails] = useState({
      first:"",
      last:"",
      email:"",
      password:"",
      comfirm:"",
      error:{

        first:"",
        last:"",
        email:"",
        password:"",
        comfirm:""

      }
    });



    const inputName = [{
      id :1,
      name:"first",
      type:"text",
      label:"First name",
      placeholder:"First name",
     
    }
    ,
    {
      id :2,
      name:"last",
      label:"Last name",
      type:"text",
      placeholder:"Last name",
     
    }
  ]

    const inputs = [
  {

    id :3,
    name:"email",
    label:"Email",
    type:"email",
    placeholder:"Email",
   
},
  {

    id :4,
    name:"password",
    label:"Password",
    type:"password",
    placeholder:"Password",
   
   
   
},
{

  id :5,
  name:"comfirm",
  label:"Comfirm password",
  type:"password",
  placeholder:"Comfirm password",
  
}
];



  const onchanage = (e)=>{

      setUserDetails({...userDetails,[e.target.name]:e.target.value});
      
  }



  useEffect(()=>{

     dispatch(setUserNull());
  },[])

  const onfocus =(e)=>{

    e.preventDefault();

    setUserDetails((prevState)=>({
        ...prevState,
        error:{
            ...prevState.error,
            [e.target.name]:""
        }
    }));
}


  const submitForm = (e)=>{

    e.preventDefault();

     const {isValid,error} = validateUserDetail(userDetails);

      if(isValid)
      {
         
         dispatch(signUp(userDetails));
      
      }
      else
      {

        setUserDetails((prevState)=>({...prevState,error}));

      }


  }


   
    if(status=="error")
    {
        
      return (<div className='flex justify-center items-center h-screen'>
                 <div>{user}</div>
           </div> )
    }
    else
    {
      if(user)
      {

      console.log(user)
      dispatch(setToken(user));
      navigate("/home");

      }

    }

   



  return (
    <div className='flex    items-center justify-center   w-full h-screen  '>

            
         <form className='max-w-[800px]  flex flex-col justify-center    p-[2rem] gap-4 rounded-md ' onSubmit={submitForm}>

               
                <h2 className='text-xl  '>Let's create an account </h2>

              <div className='flex  gap-4  '>
              {
                inputName.map((input)=>(
                  <Input key={input.id} {...input} onchange={onchanage} value={userDetails[input.name]}  onfocus={onfocus}  error={userDetails.error[input.name]} />
                ))
              }
              </div>

              {inputs.map((input)=>(
                <Input key={input.id} {...input} onchange={onchanage} value={userDetails[input.name]} onfocus={onfocus}  error={userDetails.error[input.name]}/>
              ))
            } 
          <div className='flex flex-col justify-center   gap-2 '>
          <button className='px-[20px] py-[10px] bg-black text-white rounded-md' type='submit'>{status == "loading"? <Loader/>:"Sign Up"}</button>
            <p className='text-center cursor-pointer' onClick={()=> navigate("/signin")}>Already have an account? LogIn</p>
          </div>
            <div className='flex  flex-col  justify-center text-center gap-2  '>
                     <span className='text-sm text-gray-400'>OR</span>
                <button className='px-[20px] py-[10px] bg-black text-white rounded-md flex  justify-center  gap-1 '> <img src="https://cdn-icons-png.flaticon.com/128/300/300221.png" alt="google" width={24} height={24} /></button>
                </div>
         </form>

    </div>
  )
}

export default SignUp;