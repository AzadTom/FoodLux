import express from 'express';
import {authenticateUser} from '../middleWare/authenticateUser.js';
import { checkout , paymentVerification , getRazorPayApiKey} from '../controllers/paymentController.js';

export const  paymentRoute  = express.Router();

paymentRoute.get("/getkey",authenticateUser,getRazorPayApiKey);

paymentRoute.post("/checkout",authenticateUser,checkout);

paymentRoute.post("/verification",authenticateUser,paymentVerification);
