import React from 'react'
import dp from "../assets/dp.png"
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import {serverUrl} from '../main'
import { setUserData } from '../redux/userSlice';

function Profile(){
  let {userData}=useSelector(state=>state.user)
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let [name,setName]=useState(userData?.user?.name || "");  
  let [frotendImage,setFrotendImage]=useState(userData?.user?.image || dp); 
  let [backendImage,setBackendImage]=useState(null);
  let image=useRef()
  let [saving,setSaving]=useState(false)
  const handleImage=(e)=>{
    let file=e.target.files[0]
    setBackendImage(file)
    setFrotendImage(URL.createObjectURL(file))
  }
  const handleProfile=async(e)=>{
    e.preventDefault();
    setSaving(true)
    try{
      let formData=new FormData()
      formData.append("name",name)
      if(backendImage){
        formData.append("image",backendImage)
      }
      let result=await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
      setSaving(false)
      dispatch(setUserData(result.data))
      navigate("/")
    }
    catch(error){
      console.log(error)
      setSaving(false)
    }
  }

  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
      <div className='fixed top-[20px] left-[20px] cursor-pointer'onClick={()=>navigate("/")}>
        <IoIosArrowRoundBack className='w-[50px] h-[50px] text-gray-600'/>
      </div>
      <div className='bg-white rounded-full border-4 border-[#e4cb0ac8] shadow-gray-400 shadow-lg  relative' onClick={()=>image.current.click()}>
        <div className='w-[200px] h-[200px] rounded-full overflow-hidden flex justify-center items-center'>
          <img src={frotendImage} alt="" className='h-[100%]' />
        </div>
        <IoCameraOutline className='absolute bottom-4 text-gray-700 right-5 w-[30px] h-[30px]' />
      </div>
        <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center' onSubmit={handleProfile}>
          <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>
          <input type="text" placeholder='Enter your name'  className='w-[90%] h-[50px] outline-none border-2 border-[#e4cb0ac8] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' onChange={(e)=>setName(e.target.value)} value={name} />
          <input type="text" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#e4cb0ac8] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px]' value={userData?.user?.userName} />
          <input type="email" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#e4cb0ac8] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px]' value={userData?.user?.email } />
          <button className='px-[20px] py-[10px] bg-[#e4cb0ac8] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner' disabled={saving}>{saving?"Saving...":"Save Profile"}</button>
        </form>
    </div>
  )
}

export default Profile