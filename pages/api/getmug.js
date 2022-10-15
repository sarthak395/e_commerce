import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

const handler=async (req,res)=>{ 
    let mug=await Product.findOne({slug:req.query.slug}) // getting the t-shirt
    let variants = await Product.find({title:mug.title})
    res.status(200).json({ mug:mug,variants:variants })
}
 
export default connectDb(handler)