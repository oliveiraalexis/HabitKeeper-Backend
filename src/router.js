import express from 'express'
import {getUser, getUsers, createUser, deleteUser} from './controllers/UserController.js'
import {getHabits, getHabit, createHabit, deleteHabits, deleteHabit} from './controllers/HabitController.js'

const router = express.Router()

router
    .post('/users', createUser)
    .post('/habits', createHabit)
    .delete('/user/:userId', deleteUser)
    .delete('/user/:userId/habits', deleteHabits)
    .delete('/habit/:habitId', deleteHabit)
    .get('/users', getUsers)
    .get('/user/:userId', getUser)
    .get('/user/:userId/habits', getHabits)
    .get('/user/:userId/habit/:habitId', getHabit)

export default router