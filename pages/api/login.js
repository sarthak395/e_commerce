import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async (req, res) => {
    let datajson = JSON.parse(req.body)
    if (req.method == 'POST') {
        let user = await User.findOne({ "email": datajson.email });

        if (user) {
            if (datajson.email == user.email && datajson.password == CryptoJS.AES.decrypt(user.password,"secret123").toString(CryptoJS.enc.Utf8) ) {
                let token = jwt.sign({ email: user.email, name: user.name },'jwtsecret');
                res.status(200).json({ success: true, token:token});
            }
            else
                res.status(400).json({ success: false, error: "Invalid Credentials" })
        }
        else
            res.status(400).json({ success: false, error: "User Not Found" })
    }
}


export default connectDb(handler)