const mongoose=require('mongoose')

const Userschema=new mongoose.Schema({
    identifier:{type:String,required:true},
    name:String,
    contact:Number,
    email:String,
    password:String
},{timestamps:true});

mongoose.models={}
export default mongoose.model("User",Userschema)