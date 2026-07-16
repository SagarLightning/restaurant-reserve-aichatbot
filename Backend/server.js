import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import reservationRoute from './routes/reservationRoutes.js'
import chatRoutes from './routes/chat.routes.js'

const app = express()

const port = process.env.PORT || 4000

connectDB()
connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/reservations', reservationRoute)
app.use("/api", chatRoutes);

app.get('/', (req, res) => {
    res.send("API WORKING");
})

app.listen(port, () => console.log(`Server started on port ${port}`));