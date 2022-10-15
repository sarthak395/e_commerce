import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler=async (req,res)=>{ 
    let hoodie=await Product.findOne({slug:req.query.slug}) // getting the t-shirt
    let variants = await Product.find({title:hoodie.title})
    res.status(200).json({ hoodie:hoodie,variants:variants })
}
 
export default connectDb(handler)