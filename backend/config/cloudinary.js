import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

const uploadOnCloudinary=async(filePath)=>{
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    })
    try{
     const uploadResult = await cloudinary.uploader.upload(filePath)
     fs.unlinkSync(filePath) // delete the file after uploading
     return uploadResult.secure_url // return the secure URL of the uploaded image
    }
    catch(error){
        fs.unlinkSync(filePath) // delete the file even if upload fails
        console.error("Cloudinary upload error:", error);
    }

}

export default uploadOnCloudinary