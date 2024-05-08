import express from 'express'
import connectDatabase from './db'
import router from './router'

const app = express()

app.use(express.json())
app.use(router)

connectDatabase()
	.then(() => {
		app.listen('3000', () =>{
			console.log("Servidor rodando e banco de dados conectado...")
		})
	})
	.catch((error) => console.log(error))


