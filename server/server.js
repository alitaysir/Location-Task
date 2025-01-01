import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'

const PORT= process.env.PORT || 4001
const app=express()

app.use(express.json())
app.use(cors())
await connectDB()

//localhost:4000/api/user/register
app.use('/api/user',userRouter)



app.get('/',(req,res)=>{
    res.send("API Working letss goo")
})

app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))