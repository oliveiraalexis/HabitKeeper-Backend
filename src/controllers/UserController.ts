import User from '../models/User.js'
import Habit from '../models/Habit.js'
import {Request, Response} from 'express'

export class UserController {

    getUsers = async (req: Request, res: Response) => {
        try {
            const users = await User.find()
            return res.status(200).json(users)
        } catch(error: unknown){
            return res.status(500).json((error as Error).message)
        }
    }
    
    getUser = async (req: Request, res: Response) => {
        try{
            const user = await User.findById(req.params.userId)
            return res.status(200).json(user)
        } catch(error: unknown){
            return res.status(500).json((error as Error).message)
        }
    }
    
    createUser = async (req: Request, res: Response) => {
        try{
            const user = req.body
            const newUser = await User.create(user)
            return res.status(201).json(newUser)
        } catch(error: unknown) {
            return res.status(500).json((error as Error).message)
        }
    }
    
    deleteUser = async (req: Request, res: Response) => {
        try{
            const deletedUser = await User.deleteOne({_id: req.params.userId})
            if (deletedUser.deletedCount == 1) 
            {
                await Habit.deleteMany({user_id: req.params.userId})
                const users = await User.find()
                return res.status(200).json(users)
            } 
            return res.status(404).json({retorno: 'Usuário não encontrado'})
        } catch(error: unknown) {
            return res.status(500).json((error as Error).message)
        }
    }
}