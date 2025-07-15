import express from "express";
import { addProduct } from "../controllers/productController.js";

const Router = express.Router();

Router.post("/addProduct", addProduct);

export default Router;