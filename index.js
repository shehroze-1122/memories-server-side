import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from './routes/posts.js';

const app = express();

app.use(cors());
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(express.json({limit: '30mb', extended: true}))

app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://shehroze:shehrozeOp@cluster0.ynio5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>app.listen(PORT,()=>{
    console.log(`App running on port ${PORT}`)
}))

.catch((err)=>console.log('Error: ', err.message))

// mongoose.set('useFindAndModify',false)