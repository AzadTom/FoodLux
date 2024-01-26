import mongoose from 'mongoose';

export const mongodb = async()=>{

    try {

        await mongoose.connect(process.env.DB_HOST,{dbName:"food-app"})
        .then(()=>console.log("database is connected!"))
        .catch((error)=> console.log(error))
        
    } catch (error) {

        console.log(error);
        
    }


}
