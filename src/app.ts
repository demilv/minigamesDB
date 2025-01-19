import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import jwt from 'jsonwebtoken';
import checkUser from './HashingChecking/HashingChecking/HashCheck';
// import routerAuth from './routes/authRoutes'
import AuthMiddleware from './middleware/auth';
import serverless from 'serverless-http';
import mongoose from 'mongoose';

dotenv.config();

export const app = express();
app.use(cors())

const start = async () => {
    try {
      await mongoose.connect(
        `mongodb+srv://gonzalocano:${process.env.BASEKEY}@cluster0.tkcwqd3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      )
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};
start();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req: Request, res: Response, _next: NextFunction) => {
    const { name, password } = req.body;    
    const authenticated = await checkUser(name, password);
    if (authenticated) {
        const token = jwt.sign({ name }, process.env.MYKEY || "secretKey", { expiresIn: "1800s" });
        return res.json({token:token});        
    } else {
        return res.status(401).json({ error: true, message: 'Invalid credentials' });
    }
});

// app.use('/auth', AuthMiddleware, routerAuth)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    return res.status(500).json({ error: true, message: err.message || 'Application error' });
});

export const handler = serverless(app);