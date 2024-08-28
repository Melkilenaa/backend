import prisma from '../dbhelpers/prisma';
import { logins } from '../interfaces/auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class authService{
  async login(data: logins){
    const user = await prisma.user.findMany({
      where: {
        email: data.email
      }
    });

    if(user.length <1){
     return {
      error: 'Invalid user'
     }
    } else {
    const hashedPassword = user [0].password
      
    let MatchedPassword = bcrypt.compareSync(data.password, hashedPassword);
   
    if(MatchedPassword){
    let {createdAt, password, ...rest} = user[0];
     let token = jwt.sign(rest, process.env.SECRET_KEY as string, {
        expiresIn: '2h'
      });
      return {
        message: 'Login successful',
        token,
     }
    } else {

    return {
      error: "Invalid password"
    }
  }
  }
}
}