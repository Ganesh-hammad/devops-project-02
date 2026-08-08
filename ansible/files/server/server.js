import express, { json } from 'express';
import dotenv from 'dotenv/config'
import cors from 'cors'
import connectDB from './src/config/connectDB.js';
import userRouter from './src/routes/userRoute.js';
connectDB()
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter)
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.json("api is working")
});
app.listen(PORT, (req, res) => {
    console.log(`The Server is Running on Port: ${PORT}`)
})