import mongoose from 'mongoose'
const subSchema = new mongoose.Schema({
    plan: { type: String, required: true },
    platform: { type: String, required: true },
    starting: { type: Date },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    timePeriod: { type: Number, required: true },
    Ldevice: { type: Number, required: true },
    Ddevice: { type: Number, required: true },
    quality: { type: String, required: true },
    price: { type: Number, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})
mongoose.model("Sub", subSchema)