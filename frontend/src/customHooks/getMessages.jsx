import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers } from "../redux/userSlice"
import axios from "axios"
import { serverUrl } from "../main"
import { setMessages } from "../redux/messageSlice"

function getMessage(){
    let dispatch=useDispatch()
    let {userData,selectedUser}=useSelector((state)=>state.user)
    useEffect(()=>{
        const fetchMessages=async()=>{
            if(!selectedUser || !selectedUser._id) return
            try{
                let result=await axios.get(`${serverUrl}/api/message/get/${selectedUser._id}`,{withCredentials:true})
                //console.log("selectedUser:", selectedUser)
                //console.log("id:",selectedUser._id)
                //console.log("result:", result.data)
                dispatch(setMessages(result.data))  
            }
            catch(error){
                console.log(error)
            }
        }
        fetchMessages()
    },[selectedUser, userData])
}

export default getMessage