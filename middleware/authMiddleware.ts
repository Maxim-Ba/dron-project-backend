import { NextFunction, Request , Response} from 'express';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();





export default (req:Request, res:Response, next:NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Auth error" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e, "authMiddleware");
    return res.status(401).json({ message: e });
  }
};
