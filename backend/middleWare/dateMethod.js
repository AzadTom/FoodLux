
export const dateMethod  = (req,res,next)=>{


    console.log("Time:",Date.now());
    console.log("Method:",req.method);
    next();

}