import { createSlice } from "@reduxjs/toolkit";

const messagesSlice=createSlice({
    name:"message",
    initialState:{
        messages:[]
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages=action.payload
        }
    }   
})
export const {setMessages}= messagesSlice.actions
export default messagesSlice.reducer