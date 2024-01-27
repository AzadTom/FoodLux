import React, { useEffect, useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import { setRemoveToken  } from '../../reducers/tokenSlice.js';
import { setUserNull} from '../../reducers/userSlice.js';
import { setCartNull } from '../../reducers/cartSlice.js';
import { setWishlistToNull } from '../../reducers/favSlice.js';
import { useNavigate } from 'react-router-dom';
import Model from '../../components/Cart/Model.jsx';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function UserProfile({profileState,closeProfile}) {

  const {token} = useSelector((state)=>(state.token));

  const  currentUser = token.user;


  const dispatch = useDispatch();

  const navigate = useNavigate();


  const[model,setModel]= useState(false);


  const removeToken = (e)=>{


     e.preventDefault();

     closeProfile();
    
    dispatch(setRemoveToken());
    dispatch(setUserNull());
    dispatch(setCartNull());
    dispatch(setWishlistToNull());
    
    navigate("/home");
     

  }

 

  const showCloseModel=(e)=>{
      
    e.preventDefault();
    setModel((prev)=>(!prev));   
 }

 

   const Profile  = (
     <Model closeModel={showCloseModel}>
        <div onClick={(event)=> event.stopPropagation() }>
        <div className='flex flex-col gap-2 justify-center items-center h-[200px] bg-[var(--primarycolor)] rounded-lg'>
             <AccountCircleIcon/>
            <h2>{currentUser.name}</h2>
            <h2>{currentUser.email}</h2>
            <button className="px-4 py-1 bg-[var(--border)] text-[var(--primarycolor)] rounded-md" onClick={removeToken}>Log Out</button>
        </div>
     </div>
     </Model>
   )

   useEffect(()=>{

     setModel(profileState);
      console.log("inside profile",profileState);

   },[])

  return (
    <>
    <div className='flex justify-center items-center'>
      {model && Profile}
    </div>
    </>
  )
}

export default UserProfile