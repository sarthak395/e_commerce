const mongoose=require('mongoose')

const Productschema=new mongoose.Schema({
    slug:{type:String,required:true,unique:true},
    title:{type:String,required:true},
    desc:{type:String},
    img:{type:String},
    category:String,
    size:String,
    color:String,
    availabilQty:{type:Number,required:true},
    price:{type:Number,required:true},
},{timestamps:true});

mongoose.models={}
export default mongoose.model("Product",Productschema)