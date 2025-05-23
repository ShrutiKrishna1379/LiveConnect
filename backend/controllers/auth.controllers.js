import genToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

export const signUp = async (req, res) => {
    try{
        const {userName,email,password}=req.body
        const checkByUserName=await User.findOne({userName})
        if(checkByUserName){
           return res.status(400).json({message:"UserName already exist"})
        }
        const checkByUserEmail=await User.findOne({email})
        if(checkByUserEmail){
            return res.status(400).json({message:"email already exist"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password should be at least 6 characters"})
        }

        const hashedPassword=await bcrypt.hash(password,10)

        const user=await User.create({
            userName,email,password:hashedPassword
        })

        const token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"None",
            maxAge:7*24*60*60*1000
        })

        return res.status(201).json(user)
    }
    catch(err){
        return res.status(500).json({message:`signup error ${err}`})
    }
}

export const login = async (req, res) => {
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
           return res.status(400).json({message:"user does not exist"})
        }
        
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(400).json({message:"incorrect password"})
        }

        const token=await genToken(user._id)
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"None",
            maxAge:7*24*60*60*1000
        })

        return res.status(200).json(user)
    }
    catch(err){
        return res.status(500).json({message:`login error ${err}`})
    }
}

export const logOut = async (req, res) => {
    try{
        res.clearCookie("token")
        return res.status(200).json({message:"logout successfully"})
    }
    catch(err){
        return res.status(500).json({message:`logout error ${err}`})
    }
}
