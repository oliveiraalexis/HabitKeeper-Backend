import User from '../models/User.js'
import Habit from '../models/Habit.js'

const getUsers = async (req, res) => {
    const users = await User.find()
    return res.status(200).json(users)
}
const getUser = async (req, res) => {
    const user = await User.findById(req.params.userId)
    return res.status(200).json(user)
}

const createUser = async (req, res) => {
    const user = req.body
    const newUser = await User.create(user)
    return res.status(201).json(newUser)
}

const deleteUser = async (req, res) => {
    const deletedUser = await User.deleteOne({_id: req.params.userId})
    if (deletedUser.deletedCount == 1) 
    {
        await Habit.deleteMany({user_id: req.params.userId})
        const users = await User.find()
        return res.status(200).json(users)
    } 
    return res.status(204).json({retorno: 'Item não encontrado'})
}

export {getUser, getUsers, createUser, deleteUser}