import express from 'express'
import connectDatabase from './db.js'
import router from './router.js'

const app = express()

app.use(express.json())
app.use(router)

connectDatabase()
	.then(() => {
		app.listen('3000', () =>{
			console.log('Servidor rodando e banco de dados conectado...')
		})
	})
	.catch((error) => console.log(error))


