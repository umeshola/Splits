import mongoose from 'mongoose'
const msgSchema = new mongoose.Schema({
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    to: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    msg: { type: String, required: true },
    on: { type: mongoose.Schema.Types.ObjectId, ref: "Sub" }
})

mongoose.model("Msg", msgSchema)