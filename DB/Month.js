import mongoose from 'mongoose'
const monthSchema = new mongoose.Schema({
    totalR: { type: Number, required: true },
    month: { type: Date }
})
mongoose.model("Month", monthSchema)