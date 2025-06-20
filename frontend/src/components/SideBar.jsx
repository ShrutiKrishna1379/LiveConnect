import React, { useEffect, useState } from 'react'
import dp from "../assets/dp.png"
import { IoIosSearch } from "react-icons/io";
import { BiLogOutCircle } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { serverUrl } from '../main';
import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';


function SideBar(){
    let {userData,otherUsers,selectedUser,onlineUsers,searchData}=useSelector(state => state.user)
    let navigate=useNavigate()
    let [search,setSearch]=useState("")
    let [input,setInput]=useState("")
    let dispatch=useDispatch()
    const handleLogOut=async ()=>{
        try{
            let result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")
        }
        catch(error){
            console.log(error)
        }
    }
    const handlesearch=async ()=>{
        try{
            let result=await axios.get(`${serverUrl}/api/user/search?query=${input}`,{withCredentials:true})
            dispatch(setSearchData(result.data))
            //console.log("search result:", result.data)
        }
        catch(error){
            console.log(error)
        }
    }
    useEffect(()=>{
        if(input){
            handlesearch()
        }
    },[input])

  return(
    <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-slate-200 relative ${!selectedUser?"block":"hidden"}`}>
        
        {/* Log out button */}
        <div className='w-[50px] h-[50px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-[#e4cb0ac8] shadow-gray-500 text-gray-700 shadow-lg cursor-pointer fixed bottom-[20px] left-[25px]' onClick={handleLogOut}>
            <BiLogOutCircle  className='w-[20px] h-[20px]'/>
        </div>
        
        {/*Search bar */}
        {input.length>0&& 
            <div className='flex bg-[white] w-full h-full overflow-y-auto items-center flex-col gap-[10px] absolute top-[230px] z-[150] pt-[20px] shadow-lg' >
                {searchData?.map((user)=>(
                    
                        <div className='w-[95%] h-[70px] flex items-center gap-[20px]  hover:bg-[#f2dc7d] border-b-2 border-gray-400  cursor-pointer' onClick={()=>{ dispatch(setSelectedUser(user)), setInput(""), setSearch(false)} }>
                            <div className='relative flex justify-center items-center'>
                                <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center ' >
                                    <img src={user.image || dp} alt="" className='h-[100%]' />
                                </div>
                                {onlineUsers?.includes(user._id) && <span className='w-[12px] h-[12px]  absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
                            </div>
                            <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
                        </div> 
                    
                ))}
            </div>
        }
    
        {/* Main sidebar */}
        <div className='w-full h-[300px] bg-[#e4cb0ac8] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px]'>
            <h1 className='text-white font-bold text-[25px]'>LinkUp</h1>
            <div className='w-full flex justify-between items-center'>
                <h1 className='text-gray-800 font-bold text-[25px]'>Hii, {userData?.user?.name || "user"}</h1>
                <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center shadow-gray-500 shadow-lg cursor-pointer' onClick={()=>navigate("/profile")}>
                    <img src={userData?.user?.image || dp} alt="" className='h-[100%]' />
                </div>
            </div>

            <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[15px]'>
                {!search && 
                    <div className='w-[50px] h-[50px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 shadow-lg cursor-pointer' onClick={()=>setSearch(true)}>
                        <IoIosSearch  className='w-[20px] h-[20px]'/>
                    </div> 
                }

                {search && 
                    <form className='w-[90%] h-[50px]  bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px]'>
                        <IoIosSearch  className='w-[20px] h-[20px]'/>
                        <input type="text" placeholder='Search users...' className='w-full h-full p-[10px] text-[17px] outline-none border-0' onChange={(e)=>setInput(e.target.value)} value={input} />
                        <RxCross2 className='w-[20px] h-[20px] cursor-pointer' onClick={()=>setSearch(false)} />
                    </form>
                }

                {!search && 
                otherUsers?.map((user)=>(
                    onlineUsers?.includes(user._id) &&
                    <div className='relative rounded-full shadow-gray-500 shadow-lg flex justify-center items-center cursor-pointer'onClick={()=>dispatch(setSelectedUser(user))}>
                        <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center ' >
                            <img src={user.image || dp} alt="" className='h-[100%]' />
                        </div>
                        <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>
                    </div>
                ))}
                
            </div>

        </div>

        {/* Other users list */}
        <div className='w-full h-[50%] mt-[20px] items-center overflow-auto flex flex-col gap-[20px]'>
            {otherUsers?.map((user)=>(
                <div className='w-[95%] h-[60px] flex items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:bg-[#f2dc7d] cursor-pointer' onClick={()=>dispatch(setSelectedUser(user))}>
                    <div className='relative rounded-full shadow-gray-500 shadow-lg flex justify-center items-center'>
                        <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center ' >
                            <img src={user.image || dp} alt="" className='h-[100%]' />
                        </div>
                        {onlineUsers?.includes(user._id) && <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
                    </div>
                    <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
                </div>     
            ))}
        </div>

    </div>
  )
}

export default SideBar