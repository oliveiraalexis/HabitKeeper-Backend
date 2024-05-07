import express from 'express'
import {getUsers, createUser} from './controllers/UserController.js'
import {getHabits, getHabit, createHabit} from './controllers/HabitController.js'

const router = express.Router()

router.get('/users', getUsers)
router.post('/users', createUser)

router.get('/user/:userId/habits', getHabits)
router.get('/user/:userId/habit/:habitId', getHabit)
router.post('/habits', createHabit)

export default router