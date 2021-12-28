import usersModel from "../models/usersModel.js";
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

export const signin = async (req, res) =>{

    try {

        const { email, password } = req.body;
        const existingUser = await usersModel.findOne({email});

        if(!existingUser) return res.status(404).json({ message: 'User Doesn\'t Exist'});

        const matchPassword = bcrypt.compare(password, existingUser.password );
        if(!matchPassword) return res.status(400).json({message: 'Incorrect Password'})
        
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id },'token', { expiresIn: '1h'} )
        
        return res.status(200).json({ user: existingUser, token: token});

    } catch (error) {
        return res.status(500).json({message:'Something went wrong'})    
    }
}

export const signup = async (req, res) =>{

    try {

        const { firstName, lastName, email, password, confirmPassword } = req.body;
        
        const existingUser = await usersModel.findOne({email});

        if(existingUser) return res.status(400).json({ message: 'User already Exist'});

        if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords doesn\'t match'});
        const hashedPassword = await bcrypt.hash(password, 12 );
        const newUser = await usersModel.create({ email: email, password: hashedPassword, firstName, lastName});
        const token = jwt.sign({ email: newUser.email, id: newUser._id },'token', { expiresIn: '1h'} )
        
        res.status(200).json({ newUser, token});

    } catch (error) {
        res.status(500).json({message:'Something went wrong', error})    
    }
    
}