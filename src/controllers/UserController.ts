import User from '../models/User.js'
import Habit from '../models/Habit.js'
import {Request, Response} from 'express'
import bcrypt from 'bcrypt'

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

    getUserByUsername = async (req: Request, res: Response) => {
        try{
            const user = await User.findOne({username: req.params.username})
            if (user) return res.status(200).json(user)
            return res.status(404).json({retorno: 'Usuário não encontrado'}) 
        } catch(error: unknown){
            return res.status(500).json((error as Error).message)
        }
    }

    loginUser = async (req: Request, res: Response) => {
        try{
            const user = await User.findOne({username: req.body.username})
            if (user) {
                const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
                if (isPasswordCorrect) return res.status(200).json(user)
                return res.status(401).json({retorno: 'Senha incorreta'})
            }
            return res.status(404).json({retorno: 'Usuário não encontrado'})
        } catch(error: unknown){
            return res.status(500).json((error as Error).message)
        }
    }
    
    createUser = async (req: Request, res: Response) => {
        try{
            const user = await User.findOne({username: req.body.username})
            if (!user){
                const {name, username, password} = req.body
                const salt = await bcrypt.genSalt(12)
                const hashedPassword = await bcrypt.hash(password, salt)
                const user = {
                    name,
                    username,
                    password: hashedPassword
                }
                const newUser = await User.create(user)
                return res.status(201).json(newUser)
            }
            return res.status(409).json({retorno: 'Usuário já cadstrado'})
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

    updateUser = async (req: Request, res: Response) => {
        try{
            const {name, username, password} = req.body
                const salt = await bcrypt.genSalt(12)
                const hashedPassword = await bcrypt.hash(password, salt)
                const updatedUser = {
                    name,
                    username,
                    password: hashedPassword
                }

            const result = await User.updateOne({_id: req.params.userId}, updatedUser)
            if(result.modifiedCount && result.modifiedCount == 1) return res.status(200).json({retorno: 'Usuário atualizado'})
                return res.status(404).json({retorno: 'Não foi possível atualizar os dados do usuário'})
        } catch(error: unknown) {
            return res.status(500).json((error as Error).message)
        }
    }
}