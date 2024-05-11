import mongoose from 'mongoose'
import 'dotenv/config'

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.p7rcnjg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`

const connectDatabase = async () => {
	await mongoose.connect(uri)
}
export default connectDatabase
