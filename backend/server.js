import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';

// middleware
import { dateMethod } from './middleWare/dateMethod.js';

// Routes
import {productRoute} from './routes/productRoute.js';
import {userRoute} from './routes/userRoute.js';
import {cartRoute} from './routes/cartRouter.js';
import {favRoute} from './routes/favRouter.js';
import { paymentRoute } from './routes/paymentRouter.js';

// Database
import { mongodb } from './database/database.js';




const server = express();


config({path:"./config.env"});

 



class Server {



    constructor(){


      this.db();
      this.init();
      this.middleware();
      this.routes();
      this.listen();
      
    }


    db(){

      mongodb();
    }

    init(){


      server.get("/",(req,res)=>{

        res.json({api:"api is working!"});
        
      })

    }

    middleware(){


      // cors & corsOption
        server.use(cors());


      //  global middleware
       server.use(dateMethod)

      //  convert into json form
       server.use(express.json());
       server.use(express.urlencoded({extended:true}));

      
    }

    routes(){

      server.use("/products",productRoute);
      server.use("/users",userRoute);
      server.use("/carts",cartRoute);
      server.use("/favs",favRoute);
      server.use("/payment",paymentRoute);

    }

    listen(){


          server.listen(process.env.PORT,()=>{

              console.log("server is running on 5000 port!");
          })

      
    }


}


new Server();






  






