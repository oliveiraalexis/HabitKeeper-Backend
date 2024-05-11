import Habit from '../models/Habit.js'
import {Request, Response} from 'express'

const getHabits = async (req: Request, res: Response) => {
    try{
        const habits = await Habit.find({user_id: req.params.userId})
        return res.status(200).json(habits)
    } catch(error) {
        return res.status(500).json(error.message)
    }
}

const getHabit = async (req: Request, res: Response) => {
    try{
        const habits = await Habit.find({_id: req.params.habitId, user_id: req.params.userId})
        return res.status(200).json(habits)
    } catch(error) {
        return res.status(500).json(error.message)
    }
}

const createHabit = async (req: Request, res: Response) => {
    try{
        const habit = req.body
        const newHabit = await Habit.create(habit)
        return res.status(201).json(newHabit)
    } catch(error) {
        return res.status(500).json(error.message)
    }
}

const deleteHabits = async (req: Request, res: Response) => {
    try{
        const result = await Habit.deleteMany({user_id: req.params.userId})
        if (result.deletedCount > 0) return res.status(200).json({retorno: 'Hábitos deletados'})
        return res.status(404).json({retorno: 'Itens não encontrados'})
    } catch(error) {
        return res.status(500).json(error.message)
    }
}

const deleteHabit = async (req: Request, res: Response) => {
    try{
        const result = await Habit.deleteOne({_id: req.params.habitId})
        if (result.deletedCount == 1) return res.status(200).json({retorno: 'Hábito deletado'})
        return res.status(404).json({retorno: 'Hábito não encontrado'})
    } catch(error) {
        return res.status(500).json(error.message)
    }
}

export {getHabits, getHabit, createHabit, deleteHabits, deleteHabit}