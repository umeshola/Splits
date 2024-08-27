import mongoose from 'mongoose'
const refundSchema = new mongoose.Schema({
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    plan: { type: String, required: true },
    platform: { type: String, required: true },
    member: { type: Number, required: true },
})
mongoose.model("Refund", refundSchema)