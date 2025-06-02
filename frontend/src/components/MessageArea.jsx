import React from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from "../assets/dp.png"

const MessageArea = () => {
  return (
    <div className='lg:w-[70%] hidden lg:block w-full h-full bg-slate-200 border-l-2 border-gray-300'>

      <div className='w-full h-[100px] gap-[20px] bg-[#b7bc25e0] rounded-b-[30px] shadow-gray-400 shadow-lg flex items-center px-[20px]'>
            <div className='cursor-pointer'>
              <IoIosArrowRoundBack className='w-[40px] h-[40px] text-white'/>
            </div>  
            <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer' >
              <img src={dp} alt="" className='h-[100%]' />
            </div>   
            <h1 className='text-white font-semibold text-[20px]'>user</h1> 
      </div>

    </div>
  )
}

export default MessageArea