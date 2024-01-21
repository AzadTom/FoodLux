import { userModel } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import Jwt  from "jsonwebtoken";


export const signUp = async(req,res)=>{


    const { name ,email ,password} = req.body;
    


    const user = await userModel.findOne({email:email});

    if(user)
    {
        return res.status(400).json({message:"user already exist!"})
    }


    const hashPassword = await bcrypt.hash(password,10);

    const newUser = await userModel.create({name:name,email:email,password:hashPassword});



    const token = Jwt.sign({userId:newUser._id},process.env.JWT);


    return res.status(201).json({user:newUser,token:token});


}


export const signin = async(req,res)=>{



    const {email,password} = req.body;


    const user = await userModel.findOne({email:email});

    if(!user)
    {
        return res.status(400).json({message:"user is not registered!"})
    }


    const hashPassword = await bcrypt.compare(password,user.password);

  
    if(hashPassword)
    {

        const token = Jwt.sign({userId:user._id},process.env.JWT);


        return res.status(201).json({user:user,token:token});


    }
   


}


export const userProfile = async(req,res,next)=>{

     const userid = req.userid;

     const user = await userModel.findById(userid);

     res.status(200).json({user:user})

}






