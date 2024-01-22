import React, { useState } from 'react'
import { useSelector ,useDispatch} from 'react-redux';
import { setToken } from '../../reducers/tokenSlice.js';
import { useNavigate } from 'react-router-dom';

function UserProfile() {

  const {token} = useSelector((state)=>(state.token));

  const [currentUser,setCurrentUser]= useState(token.user);


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const removeToken = (e)=>{

     e.preventDefault();
     dispatch(setToken(""));
     navigate("/home");

  }

  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='flex flex-col gap-2 justify-center items-center'>
            <h2>{currentUser.name}</h2>
            <h2>{currentUser.email}</h2>
            <button className="px-4 py-2 bg-green-600 text-white" onClick={removeToken}>Log Out</button>
        </div>
    </div>
  )
}

export default UserProfile