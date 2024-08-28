import {Request, Response} from 'express';
import { authService } from '../services/auth.user';
import { extendedRequest } from '../middlewares/verifyToken';

let service = new authService();

export class authController{
  async login(req: Request, res: Response){
    try {
      let {email, password} = req.body;
      let eponse = await service.login(req.body);

      return res.status(200).json(eponse);
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error'
      });
      
    }
  }
  async checkDetails(req: extendedRequest, res: Response){
    try{
      if(req.info){
        return res.status(200).json({
          info: req.info
      })
    }
      } catch (error) {
        return res.status(500).json({
          message: 'Internal server error'
        });
      }
    }
  }