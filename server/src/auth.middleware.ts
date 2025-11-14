// auth.middleware.ts
import express from "express"
import { JwtService } from '@nestjs/jwt';

export function AuthMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
 
  
  const access_token = req.cookies['access_token'];
  const refresh_token = req.cookies['refresh_token'];

  if (!access_token) {
    console.log('No access token found');
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const verifyJWT = new JwtService({
    secret: process.env.JWT_ACCESS_SECRET,
  });
  const decoded = verifyJWT.decode(access_token);
  if (!decoded) {
    console.log('Invalid access token');
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}
