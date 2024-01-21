import { foodModel } from '../models/productModel.js';


export const  getProducts = async(req,res)=>{


    const data  = await foodModel.find();

    res.status(200).json({data})

}

export const singleDish  = async(req,res)=>{


      const {id} = req.params;

      const data  = await foodModel.find({id:id});


      res.json({single: data});



}