import Razorpay  from 'razorpay';
import crypto from 'crypto';
import {OrderModel} from '../models/orderModel.js';
import {cartModel}  from '../models/cartModel.js';
import { userModel} from '../models/userModel.js';

const  instance = new Razorpay({ key_id: `${process.env.RAZOR_API_KEY}`, key_secret: `${process.env.KEY_SECRET}` })


export const getRazorPayApiKey = async(req,res)=>{


     res.status(200).json({key:process.env.RAZOR_API_KEY});

} 


export const checkout  = async(req,res)=>{


    const options = {
            amount: req.body.amount * 100,
            currency: "INR",
            receipt: "receipt",
        }

     const order  = await instance.orders.create(options);  
     
     res.status(200).json({success:true , order:order});

}


export const paymentVerification  = async(req,res)=>{


    const { razorpay_order_id , razorpay_payment_id, razorpay_signature} = req.body;

    const body  = razorpay_order_id + "|" +razorpay_payment_id;

    const expectedSignature  = crypto.createHmac("sha256",`${process.env.KEY_SECRET}`)
                                     .update(body.toString())
                                     .digest("hex");
                                     

    const  isAuthentic  = expectedSignature === razorpay_signature;

    if(isAuthentic)
    {
         //Database comes here 
         const  {name,email}  = await userModel.findById(req.userid);

         const cart  = await cartModel.find({user:req.userid});

         const subtotal = cart.reduce((acc, item) => ((item.price) * (item.qty)) + acc, 0);

         const order = await OrderModel.create({
            user:req.userid,
            items:cart,
            totalPrice:subtotal,
            paymentDetail:{
                username: name,
                useremail:email,
                product_id:razorpay_payment_id
            }
         })


         const deleteCartItems = await cartModel.deleteMany({user:req.userid});

         if(order && deleteCartItems){

             // then redirect to frontend!
            res.status(200).json({success:true});
         }
         else
         {

            res.status(400).json({success:false});

         }

 
        

    }

    else

    {

        res.status(400).json({success:false});

    }



}




export const orderHistory = async(req,res)=>{


    const ordershistory = await OrderModel.find({user:req.userid});

    return res.status(200).json({orders:ordershistory});

}












