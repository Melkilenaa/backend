import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {Token_details} from '../interfaces/User';

export interface extendedRequest extends Request {
  info?: Token_details

}
export const verifyToken = (req: extendedRequest, res: Response, next: NextFunction) => {
try {
  const token = req.headers && req.headers.token as string;
  if(!token){
    return res.status(401).json({
      message: 'Unauthorized'
    });
  } else{
    let data = jwt.verify(token, process.env.SECRET_KEY as string ) as  Token_details;
    req.info = data;
  }
} catch (error) {
  return res.json({
    error
  })
}
next();
}