import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const {username, email, password, role} = req.body;

    try{
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });

        if (existingUser){
            return res.status(400).json({error: 'Username or email already exists'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role
        });

        await user.save();
        res.status(201).json({message: 'User registered successfully'});

    }catch(error) {
        console.error('Error registering user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
}

export const loginUser = async (req, res) => {
    const {username, password, role} = req.body;

    try{
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            return res.status(404).json({error: 'User not found'});
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
            return res.status(401).json({error: 'Invalid password'});
        }

        const token = jwt.sign(
            {userId: user._id},
            'RANDOM_TOKEN_SECRET',
            {expiresIn: '24h'}
            
        )

        return res.status(200).json({
            userId: user._id,
            token: token,
            role: user.role
        });

    }catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({message: 'Internal server error'});
    }
}