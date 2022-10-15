import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import { nanoid } from "nanoid"

const handler = async (req, res) => {
    console.log(req.body)
    if (req.method == 'POST') {
        let u = new User({
            identifier: nanoid(),
            name:req.body.name,
            contact:req.body.contact,
            email:req.body.email,
            password:req.body.password,
        })
        u.save()
        res.status(200).json(req.body)
    }



}

export default connectDb(handler)