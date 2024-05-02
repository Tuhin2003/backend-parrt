import express from 'express';
import mongoose from 'mongoose';

import router from './routes/router.js';

import dotenv from 'dotenv';

dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.URI)
    .then(() => {
        console.log("Connected to MongoDB");

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    });


app.use(router);
