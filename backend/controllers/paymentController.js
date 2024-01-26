import Razorpay  from 'razorpay';
import crypto from 'crypto';

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


         // then redirect to frontend!
         res.redirect(`${process.env.FRONTEND}/paymentsuccess?reference=${razorpay_payment_id}`);

    }

    else

    {

        res.status(400).json({success:false});

    }



}