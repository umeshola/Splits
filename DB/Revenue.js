import mongoose from 'mongoose'
const revenueSchema = new mongoose.Schema({
    totalR: { type: Number, required: true }
})
mongoose.model("Revenue", revenueSchema)