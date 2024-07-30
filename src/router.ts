import express from 'express'
import {UserController} from './controllers/UserController.js'
import {HabitController} from './controllers/HabitController.js'

const router = express.Router()
const userController = new UserController()
const habitController = new HabitController()

router
    .post('/users', userController.createUser)
    .post('/habits', habitController.createHabit)
    .put('/habit/:habitId', habitController.updateHabit)
    .put('/user/:userId', userController.updateUser)
    .delete('/user/:userId', userController.deleteUser)
    .delete('/user/:userId/habits', habitController.deleteHabits)
    .delete('/habit/:habitId', habitController.deleteHabit)
    .get('/users', userController.getUsers)
    .get('/user/:userId', userController.getUser)
    .get('/user/:userId/habits', habitController.getHabits)
    .get('/user/:userId/habit/:habitId', habitController.getHabit)
    .post('/login', userController.loginUser)

export default router