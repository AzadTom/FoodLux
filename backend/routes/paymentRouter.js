import express from 'express';
import { checkout , paymentVerification , getRazorPayApiKey} from '../controllers/paymentController.js';

export const  paymentRoute  = express.Router();

paymentRoute.get("/getkey",getRazorPayApiKey);

paymentRoute.post("/checkout",checkout);

paymentRoute.post("/verification",paymentVerification);
