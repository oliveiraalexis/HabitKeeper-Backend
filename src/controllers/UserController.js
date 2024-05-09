import User from '../models/User.js'
import Habit from '../models/Habit.js'

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json(users)
    } catch(error){
        return res.status(500).json(error.message)
    }
}

const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.userId)
        return res.status(200).json(user)
    } catch(error){
        return res.status(500).json(error.message)
    }
}

const createUser = async (req, res) => {
    try{
        const user = req.body
        const newUser = await User.create(user)
        return res.status(201).json(newUser)
    } catch(error) {
        return res.status(500).json(error.message)
    }
}

const deleteUser = async (req, res) => {
    try{
        const deletedUser = await User.deleteOne({_id: req.params.userId})
        if (deletedUser.deletedCount == 1) 
        {
            await Habit.deleteMany({user_id: req.params.userId})
            const users = await User.find()
            return res.status(200).json(users)
        } 
        return res.status(404).json({retorno: 'Item não encontrado'})
    } catch(error) {
        return res.status(500).json(error.message)
    }
}

export {getUser, getUsers, createUser, deleteUser}