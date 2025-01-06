import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'] as string;
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    next(res.status(401).json({ error: true, message: 'Token not provided' }));
    return;
  }

  jwt.verify(token, process.env.MYKEY as string, (err: any) => {
    if (err) {
      next(res.status(403).json({ error: true, message: 'Token is not valid' }));
      return;
    }
    next();
  });
}

export default AuthMiddleware;
