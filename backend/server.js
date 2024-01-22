import express from 'express';
import {config} from 'dotenv';
import cors from 'cors';

// middleware
import { dateMethod } from './middleWare/dateMethod.js';

// Routes
import {productRoute} from './routes/productRoute.js';
import {userRoute} from './routes/userRoute.js';

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


      server.get("/",async(req,res)=>{

        res.json({api:"api is working!"});
        
      })

    }

    middleware(){


      // cors & corsOption
      const corsOptions = {
        origin: [process.env.FRONTEND],
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
        credentials: true
      };

     
       server.use(cors());

      //  global middleware
       server.use(dateMethod)

      //  convert into json form
       server.use(express.json());
      
    }

    routes(){

      server.use("/products",productRoute);
      server.use("/users",userRoute);

    }

    listen(){


          server.listen(process.env.PORT,()=>{

              console.log("server is running on 5000 port!");
          })

      
    }


}


new Server();






  






