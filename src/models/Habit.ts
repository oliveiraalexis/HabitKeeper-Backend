import mongoose, { Types } from 'mongoose'
const { Schema } = mongoose

interface IHabit {
    name: "String",
    user_id: Types.ObjectId,
    trackedDays: [Date],
    createdAt: Date
}

const habitSchema = new Schema<IHabit>({
    name: {
        type: 'String',
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    trackedDays: {
        type: [Date],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Habit', habitSchema)