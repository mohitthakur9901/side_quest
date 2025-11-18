import express from "express"
import jwt from "jsonwebtoken";

export function QuestMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
    
    const authHeader = req.cookies.access_token;

    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const token = authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

