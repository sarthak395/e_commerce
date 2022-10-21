import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
import { nanoid } from "nanoid"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    let datajson = JSON.parse(req.body);
    if (req.method == 'POST') {
        let u = new User({
            identifier: nanoid(),
            name: datajson.name,
            contact: datajson.contact,
            email: datajson.email,
            password: CryptoJS.AES.encrypt(datajson.password, "secret123").toString(),
        });
        let error;
        try {
            await u.save()
            res.status(200).json(u)
        } catch (err) {
            error = err;
            res.status(400).json({ error: err })
        }

    }
    else {
        res.status(400).json({ error: "Invalid Request" })
    }
}


export default connectDb(handler)