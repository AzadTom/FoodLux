import express from 'express';
import { signUp,signin } from '../controllers/userController.js';


export const userRoute = express.Router();


userRoute.post("/signin",signin);

userRoute.post("/signup",signUp);










