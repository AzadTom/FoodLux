import mongoose from 'mongoose';

const favSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },

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

export const favModel = mongoose.model("favs",favSchema);

