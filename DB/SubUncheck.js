import mongoose from 'mongoose'
const subUncheckSchema = new mongoose.Schema({
    plan: { type: String, required: true },
    platform: { type: String, required: true },
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    member: { type: Number, required: true },
    timePeriod: { type: Number, required: true },
    Ldevice: { type: Number, required: true },
    Ddevice: { type: Number, required: true },
    quality: { type: String, required: true },
    price: { type: Number, required: true },
})

mongoose.model("SubUncheck", subUncheckSchema)