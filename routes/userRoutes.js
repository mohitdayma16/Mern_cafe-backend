import express from "express";
const  Router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET = "something";
import { authenticate,authorize } from "../middlewares/auth.js";
import {register,login,update, showuser , updateuser, deleteuser, showone} from "../controllers/userController.js";





Router.post("/register", register);

Router.post("/login", login);

Router.post("/update/:email/:username", update);

Router.get("/showuser",authenticate, authorize("admin"), showuser);

Router.patch("/:id",  authenticate, authorize("admin"), updateuser)

Router.delete("/:id", authenticate, authorize("admin"),  deleteuser);

Router.get("/showone/:id", showone);

export default Router;