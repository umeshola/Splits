import mongoose from 'mongoose'
const waitingSchema = new mongoose.Schema({
    plan: { type: String, required: true },
    platform: { type: String, required: true },
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    member: { type: Number, required: true },
    timePeriod: { type: Number, required: true },
    timeRN: { type: Date },
    price: { type: Number, required: true },
})

mongoose.model("Waiting", waitingSchema)