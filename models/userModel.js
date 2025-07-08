import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstname:{type:String},
    lastname:{type:String},
    email:{type:String, unique: true},
    password:{type:String},
    role:{type:String, default: "user"},
    status:{type:String},
},{timestamps: true}
);

const userModel = mongoose.model("User",userSchema);

export  default mongoose.model("User",userSchema);
//user model