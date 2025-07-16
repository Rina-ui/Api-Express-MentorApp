import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express(); 
export default app;

mongoose.connect('mongodb+srv://m40282897:ma-gra12@cluster0.7q1vrxe.mongodb.net/Mentor?retryWrites=true&w=majority&appName=Cluster0',{
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());