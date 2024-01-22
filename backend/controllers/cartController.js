import { cartModel } from "../models/cartModel.js";

export const getcart= async(req,res)=>{


     
      const cartData = await cartModel.find({user:req.userid});


      return res.status(200).json({cartData});


}



export const addTocart = async(req,res)=>{

       
     
      try {

        const { id , name , img ,price ,qty ,category} = req.body;

        const singlecart = await cartModel.create({
            user:req.userid,
            id,
            name,
            img,
            price,
            qty,
            category
          })

          res.status(201).json({singlecart});
        
      } catch (error) {

          res.status(400).json({message:"unAuthorized!"});
          console.log(error.message);
        
      }
      

}

export const removetocart = async(req,res)=>{

    try {

        

        const singlecart =  await cartModel.findByIdAndDelete(req.params.id);

        res.status(200).json({singlecart});
        
    } catch (error) {
        
        res.status(400).json({message:"unAuthorized!"});
        console.log(error.message);
    }
}