import mongoose from 'mongoose'
const helpSchema = new mongoose.Schema({
    by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    complain: { type: mongoose.Schema.Types.ObjectId, ref: "Sub" },
    timeRN: { type: Date },
})

mongoose.model("Help", helpSchema)