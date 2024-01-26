import express from 'express';
import {getfavs,addTofav,removetofav} from '../controllers/favController.js';
import { authenticateUser} from '../middleWare/authenticateUser.js';

export const favRoute = express.Router();

favRoute.post("/create",authenticateUser,addTofav);

favRoute.delete("/:id",authenticateUser,removetofav);

favRoute.get("/",authenticateUser,getfavs);