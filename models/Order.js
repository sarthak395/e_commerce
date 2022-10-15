const mongoose=require('mongoose')

const Orderschema=new mongoose.Schema({
    orderid:{type:String,required:true},
    products:[{
        productid:{type:String,required:true},
        quantity:{type:Number,default:1},
        price:{type:Number}
    }],
    address:{type:String,required:true},
    amount:{type:Number,required:true},
    status:{type:String,default:'Pending',required:true},
},{timestamps:true});

mongoose.models={}
export default mongoose.model("Order",Orderschema)