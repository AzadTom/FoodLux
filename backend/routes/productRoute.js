import express from 'express';
import { getProducts ,singleDish} from '../controllers/productController.js';


export const  productRoute = express.Router();


productRoute.get("/",getProducts);

productRoute.get("/:id",singleDish);




