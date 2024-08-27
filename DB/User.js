import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    sub: [{ type: mongoose.Schema.Types.ObjectId, ref: "Sub" }]
})

mongoose.model("User", userSchema)