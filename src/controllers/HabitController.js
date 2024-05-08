import Habit from '../models/Habit'

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

const deleteHabits = async (req, res) => {
    const result = await Habit.deleteMany({user_id: req.params.userId})
    if (result.deletedCount > 0) return res.status(200).json({retorno: 'Hábitos deletados'})
    return res.status(204).json({retorno: 'Itens não encontrados'})
}

const deleteHabit = async (req, res) => {
    const result = await Habit.deleteOne({_id: req.params.habitId})
    if (result.deletedCount == 1) return res.status(200).json({retorno: 'Hábito deletado'})
    return res.status(204).json({retorno: 'Item não encontrado'})
}

export {getHabits, getHabit, createHabit, deleteHabits, deleteHabit}