import mongoose from 'mongoose'
const plansoldSchema = new mongoose.Schema({
    count: { type: Number, required: true },
    plan: { type: String, required: true },
    platform: { type: String, required: true },
    members: { type: Number, required: true }
})
mongoose.model("PlanSold", plansoldSchema)