import React, { useState } from 'react'
import dp from "../assets/dp.png"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SideBar=()=>{
    let {userData}=useSelector(state => state.user)
    let navigate=useNavigate()
    let [search,setSearch]=useState(false)
  return(
    <div className='lg:w-[30%] w-full h-full bg-slate-200'>
        <div className='w-full h-[300px] bg-[#e4cb0ac8] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]'>
            <h1 className='text-white font-bold text-[25px]'>LinkUp</h1>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-gray-800 font-bold text-[25px]'>Hii, {userData?.user?.name || "hello"}</h1>
                <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer' onClick={()=>navigate("/profile")}>
                    <img src={userData?.user?.image || dp} alt="" className='h-[100%]' />
                </div>
            </div>

            <div>
                {!search && 
                    <div className='w-[50px] h-[50px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg cursor-pointer' onClick={()=>setSearch(true)}>
                        <IoIosSearch  className='w-[20px] h-[20px]'/>
                    </div> 
                }

                {search && 
                    <form className='w-[90%] h-[50px]  bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px]'>
                        <IoIosSearch  className='w-[20px] h-[20px]'/>
                        <input type="text" placeholder='Search users...' className='w-full h-full p-[10px] text-[17px] outline-0 border-0' />
                        <RxCross2 className='w-[20px] h-[20px] cursor-pointer' onClick={()=>setSearch(false)} />
                    </form>
                }
                
            </div>

        </div>
    </div>
  )
}

export default SideBar