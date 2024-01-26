import mongoose from 'mongoose';

import { FoodSchema } from './productModel.js';

const OrderSchema  = new mongoose.Schema({

    user:{
       
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true

    },
    items:[FoodSchema],
    totalPrice:{
        type:Number,
        required:true
    },
    paymentDetail:{
       
        username:String,
        useremail:String,
        product_id:String
    },
    orderDate: 
    { type: Date, default: Date.now }

})


export const OrderModel = mongoose.model("Order",OrderSchema);

