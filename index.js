import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import postRoutes from './routes/posts.js';
config();

const app = express();

app.use(cors());
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(express.json({limit: '30mb', extended: true}))

app.use('/posts', postRoutes);

const CONNECTION_URL = process.env.DATABASE_CONNECTION_URI;

const PORT = process.env.PORT;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`)
}))
.catch((err)=>console.log('Error: ', err.message))

