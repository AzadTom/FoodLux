import {favModel} from '../models/favModel.js';

export const getfavs = async(req,res)=>{


    const favData = await favModel.find({user:req.userid});

    return res.status(200).json(favData);

}


export const addTofav = async(req,res)=>{

    try {

        try {

            const { id , name , img ,price ,qty ,category} = req.body;
    
            const singlefav = await favModel.create({
                user:req.userid,
                id,
                name,
                img,
                price,
                qty,
                category
              })
    
              res.status(201).json({singlefav});
            
          } catch (error) {
    
              res.status(400).json({message:"unAuthorized!"});
              console.log(error.message);
            
          }
          
        
    } catch (error) {
        res.status(400).json({message:"unAuthorized!"});
        console.log(error.message);
    }
}

export const removetofav = async(req,res)=>{

    try {

        

        const singlefav =  await favModel.findByIdAndDelete(req.params.id);

        res.status(200).json({singlefav});
        
    } catch (error) {
        
        res.status(400).json({message:"unAuthorized!"});
        console.log(error.message);
    }
}