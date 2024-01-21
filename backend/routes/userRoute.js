import express from 'express';
import { signUp,signin ,userProfile } from '../controllers/userController.js';
import { authenticateUser } from '../middleWare/authenticateUser.js';


export const userRoute = express.Router();


userRoute.post("/signin",signin);

userRoute.post("/signup",signUp);

userRoute.get("/profile",authenticateUser,userProfile);










