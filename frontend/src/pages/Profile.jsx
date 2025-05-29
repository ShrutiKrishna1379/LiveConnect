import React from 'react'
import dp from "../assets/dp.png"
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  let {userData}=useSelector(state=>state.user)
  let navigate=useNavigate()
  return (
    <div className='w-full h-[100vh] bg-slate-200 flex flex-col justify-center items-center gap-[20px]'>
      <div className='fixed top-[20px] left-[20px] cursor-pointer'onClick={()=>navigate("/")}>
        <IoIosArrowRoundBack className='w-[50px] h-[50px] text-gray-600'/>
      </div>
      <div className='bg-white rounded-full border-4 border-[#e4cb0ac8] shadow-gray-400 shadow-lg  relative'>
        <div className='w-[200px] h-[200px] rounded-full overflow-hidden'>
          <img src={dp} alt="" className='h-[100%]' />
        </div>
        <IoCameraOutline className='absolute bottom-4 text-gray-700 right-5 w-[30px] h-[30px]' />
      </div>
        <form className='w-[95%] max-w-[500px] flex flex-col gap-[20px] items-center justify-center' >
          <input type="text" placeholder='Enter your name'  className='w-[90%] h-[50px] outline-none border-2 border-[#e4cb0ac8] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' />
          <input type="text" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#e4cb0ac8] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px]' value={userData?.user?.userName} />
          <input type="email" readOnly className='w-[90%] h-[50px] outline-none border-2 border-[#e4cb0ac8] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-400 text-[19px]' value={userData?.user?.email } />
          <button className='px-[20px] py-[10px] bg-[#e4cb0ac8] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner'>Save profile</button>
        </form>
    </div>
  )
}

export default Profile