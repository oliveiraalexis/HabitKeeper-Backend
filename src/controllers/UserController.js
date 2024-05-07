import User from '../models/User.js'

const getUsers = async (req, res) => {
    const users = await User.find()
    return res.status(200).json(users)
}

const createUser = async (req, res) => {
    const user = req.body
    const newUser = await User.create(user)
    return res.status(201).json(newUser)
}

export {getUsers, createUser}