import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const SECRET = "something";
// import { authenticate, authorize } from "./auth.js";

const register = async (req,res)=>{
    try {
    const { firstname,lastname,username, email, password, role,status } = req.body;
    const hashedpwd = await bcrypt.hash(password, 10);
    const user = {
        firstname,
        lastname,
        username,
        email,
        password: hashedpwd,
        role,
        status,

    };
    const result = await userModel.create(user);
    res.status(201).json(result);
}
catch (err){
    console.log(err);
    res.status(500).json({message: "something went wrong"})
    
}};

const login = async (req,res)=>{
try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      if (isMatch) {
        const userObj = { firstname:existingUser.firstname,lastname:existingUser.lastname, email:existingUser.email, role:existingUser.role,status:existingUser.status};
        const token = jwt.sign(userObj, SECRET, { expiresIn: "1h" });
        res.status(200).json({ user: userObj, token });
      } else {
        res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      res.status(400).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
    console.log(err);
  }
}

const update = async (req,res)=>{
  try{
const mail = req.params.email;
const uname = req.params.username;

const update = await userModel.updateOne({username: uname},{$set:{email: mail}});
if(update){
  res.status(201).json(update);
}else{
  res.status(500).json({message: "something went wrong"})
}
  }catch(err){
    console.log(err);
  }
};
const showuser =   async (req,res)=>{
  try{
const result =  await userModel.find();
  res.json(result);
  }catch(err){
res.status(500).json({message: "something went wrong"});
  }
}

const updateuser = async (req, res)=>{
  try {const id = req.params.id;
  const body = req.body;
  const result = await userModel.findByIdAndUpdate(id,body);
  res.status(201).json(result);}
  catch(err){
    res.status(500).json({message: "something went wrong"});
  }
}

const deleteuser = async(req,res)=>{
  try {const id = req.params.id;
  const result = await userModel.findByIdAndDelete(id);
  res.status(201).json(result);
}catch(err){
  res.status(500).json({message: "semething went wrong"});
}
}


const showone  = async(req,res)=>{
  try {const id = req.params.id;
  const result = await userModel.findOne({_id: id});
  res.status(201).json(result);}
  catch(err){
    console.log(err);
    
  }
}


export {register,login,update, showuser , updateuser, deleteuser, showone}

//user controller