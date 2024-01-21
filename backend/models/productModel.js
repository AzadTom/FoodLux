import mongoose from "mongoose";

const  FoodSchema =  new mongoose.Schema({
    id:Number,
    name:String,
    img:String,
    price:Number,
    qty:Number,
    category:String
 
 }) 
 
 
 export const foodModel = mongoose.model("dishes",FoodSchema);