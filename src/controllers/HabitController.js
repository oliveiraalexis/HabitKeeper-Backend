import Habit from '../models/Habit.js'

const getHabits = async (req, res) => {
    const habits = await Habit.find({user_id: req.params.userId})
    return res.status(200).json(habits)
}

const getHabit = async (req, res) => {
    const habits = await Habit.find({_id: req.params.habitId, user_id: req.params.userId})
    return res.status(200).json(habits)
}

const createHabit = async (req, res) => {
    const habit = req.body
    const newHabit = await Habit.create(habit)
    return res.status(201).json(newHabit)
}

export {getHabits, getHabit, createHabit}