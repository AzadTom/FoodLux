import mongoose from 'mongoose';

const  OrderItemSchema =  new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"dishes",
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

const OrderSchema  = new mongoose.Schema({

    user:{
       
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true

    },
    items:[OrderItemSchema],
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

