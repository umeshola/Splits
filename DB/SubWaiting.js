import mongoose from 'mongoose'
const subwaitingSchema = new mongoose.Schema({
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    plan: { type: String, required: true },
    platform: { type: String, required: true },
    member: { type: Number, required: true },
    timePeriod: { type: Number, required: true },
    Ldevice: { type: Number, required: true },
    Ddevice: { type: Number, required: true },
    quality: { type: String, required: true },
    price: { type: Number, required: true },
})

mongoose.model("SubWaiting", subwaitingSchema)