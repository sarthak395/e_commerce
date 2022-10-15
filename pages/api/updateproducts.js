import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {
    if (req.method == "POST") {
        for (var i = 0; i < req.body.length; i++) {
            let p = await Product.findByIdAndUpdate(req.body[i]._id,req.body[i])  
        }
        res.status(200).json("Added Succeddfully")
    }
    else {
        res.status(400).json({ error: "Bad request" })
    }
}

export default connectDb(handler)