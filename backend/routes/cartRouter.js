import express from 'express';
import { addTocart,removetocart,getcart } from '../controllers/cartController.js';
import { authenticateUser } from '../middleWare/authenticateUser.js';

export const cartRoute  = express.Router();

cartRoute.post("/create",authenticateUser,addTocart);
cartRoute.delete("/:id",authenticateUser,removetocart);

cartRoute.get("/",authenticateUser,getcart);

