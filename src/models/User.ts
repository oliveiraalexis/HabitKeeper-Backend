import mongoose from 'mongoose'
const { Schema } = mongoose

interface IUser {
    name: 'String',
    username: 'String',
    password: 'String',
    createdAt: Date
}

const userSchema = new Schema<IUser>({
    name: {
        type: 'String',
        required: true
    },
    username: {
        type: 'String',
        required: true
    },
    password: {
        type: 'String'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('User', userSchema)