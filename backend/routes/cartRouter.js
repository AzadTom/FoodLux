import express from 'express';
import { addTocart,removetocart,getcart ,incrementDecrement} from '../controllers/cartController.js';
import { authenticateUser } from '../middleWare/authenticateUser.js';

export const cartRoute  = express.Router();

cartRoute.post("/create",authenticateUser,addTocart);
cartRoute.post("/:id",authenticateUser,incrementDecrement);
cartRoute.delete("/:id",authenticateUser,removetocart);

cartRoute.get("/",authenticateUser,getcart);

