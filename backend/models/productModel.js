import mongoose from "mongoose";

export const  FoodSchema =  new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    }
 
 }) 
 
 
 export const foodModel = mongoose.model("dishes",FoodSchema);