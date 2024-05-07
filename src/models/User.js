import mongoose from 'mongoose'
const { Schema } = mongoose

const userSchema = Schema({
    name: {
        type: "String",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model('User', userSchema)