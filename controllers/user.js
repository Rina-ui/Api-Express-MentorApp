import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import e from 'express';

export const registerUser = async (req, res) => {
    const {username, email, password} = req.body;

    try{
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser){
            return res.status(400).json({error: 'Username or email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({message: 'User registered successfully'});
        
    }catch(error) {
        console.error('Error registering user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const loginUser = async (req, res) => {

}