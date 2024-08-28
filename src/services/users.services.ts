import { User} from "../interfaces/User";
import prisma from "../dbhelpers/prisma";
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';


export class UserService{

createUser = async (user: User) => {
  let user_id = v4();
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = await prisma.user.create({
    data: {
      id: user_id,
      email: user.email,
      password: hashedPassword,
      name: user.name,
    } 
  });

  if (newUser?.id == user_id) {
    return {
      message: "User created successfully",
    }
  }else{
    return {
      message: "User not created",
    }
  }
}

async getUser() {
 
  return{
   users: await prisma.user.findMany()
  } 
}

 async viewOneUser(id: string) {
  return {
    user: await prisma.user.findUnique({
      where: {
        id: id
      }
    })
  }
  }
  async updateUser(updated_user: User) {
    let current_details = await prisma.user.findUnique({
      where:{
        id:updated_user.id
      }
    })
    let response = await prisma.user.update({
      where:{
        id:updated_user.id
      },
      data:{
        
        name: updated_user.name || current_details?.name,
        email: updated_user.email || current_details?.email,
        
      }
    })
    return {
      message: "User updated successfully"
    }
  }
  async deleteUser(id: string) {
    let response = await prisma.user.delete({
      where:{
        id:id
      }
    })
    return {
      message: "User account deleted successfully"
    }
  }
}