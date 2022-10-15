import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler=async (req,res)=>{ 
    let tshirt=await Product.findOne({slug:req.query.slug}) // getting the t-shirt
    let variants = await Product.find({title:tshirt.title})
    res.status(200).json({ tshirt:tshirt,variants:variants })
}
 
export default connectDb(handler)