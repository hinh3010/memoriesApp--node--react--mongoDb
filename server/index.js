// library
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// file
import postRoutes from './routes/posts.js';

const app = express();

// config
dotenv.config()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

// routes
app.use('/posts', postRoutes);

// connect db + run app
const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5005;

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
//     .catch((error) => console.log(`${error} did not connect`));
// mongoose.set('useFindAndModify', false);

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));
