import mongoose from "mongoose";

const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    }
    catch(err){
        console.log("db error",err.message)
    }
}

export default connectDb
