import mongoose from 'mongoose'
const { Schema } = mongoose

const habitSchema = Schema({
    name: {
        type: 'String',
        required: true
    },
    user_id: {
        type: mongoose.ObjectId,
        ref: 'User'
    },
    trackedDays: {
        type: [Date],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('Habit', habitSchema)