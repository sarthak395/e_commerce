const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    identifier: { type: String, required: true },
    name: String,
    contact: Number,
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return this.model("User")
                    .findOne({ email: v })
                    .then((user) => !user);
            },
            message: (props) => `${props.value} is already registered`,
        }
    },
    password: String
}, { timestamps: true });

mongoose.models = {}
export default mongoose.model("User", Userschema)