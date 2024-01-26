import Jwt from 'jsonwebtoken';

export const authenticateUser = async(req,res,next)=>{


    try {
        
        let token  = req.headers['authorization'];

        if(!token)
        {
            return res.status(401).json({message:"user is not authorized!"});
        }
        else
        {
            console.log(token);

             token = token.split(" ")[1];

             console.log(token);
             const user = Jwt.verify(token,process.env.JWT);

             req.userid = user.userId;

            next()

        }

        

    } catch (error) {
        
         console.log(error.message);
        return res.status(401).json({message:"user is not authorized!"});
    }


} 