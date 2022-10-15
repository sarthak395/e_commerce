import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"
import { nanoid } from "nanoid"

const handler = async (req, res) => {
    if (req.method == "POST") {
        for (var i = 0; i < req.body.length; i++) {
            let p = new Product({
                slug: nanoid(),
                title: req.body[i].title,
                desc: req.body[i].desc,
                img: req.body[i].img,
                category: req.body[i].category,
                size: req.body[i].size,
                color: req.body[i].color,
                availabilQty: req.body[i].availabilQty,
                price: req.body[i].price,
            })
            await p.save()
        }
        res.status(200).json("Added Succeddfully")
    }
    else {
        res.status(400).json({ error: "Bad request" })
    }
}

export default connectDb(handler)