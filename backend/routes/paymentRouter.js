import express from 'express';
import { authenticateUser} from '../middleWare/authenticateUser.js';
import { checkout , paymentVerification , getRazorPayApiKey ,orderHistory} from '../controllers/paymentController.js';

export const  paymentRoute  = express.Router();

paymentRoute.get("/getkey",getRazorPayApiKey);

paymentRoute.post("/checkout",checkout);

paymentRoute.post("/verification",authenticateUser,paymentVerification);

paymentRoute.get("/orders",authenticateUser,orderHistory);
