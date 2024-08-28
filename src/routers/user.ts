import { Router} from "express";
import { createUser,getUser, viewOneUser, updateUser, deleteUser } from "../controller/user.controller";



let user_router = Router();

user_router.post('/createUser', createUser);
user_router.get('/fetchall',getUser);
user_router.get('/get/:id', viewOneUser);
user_router.put('/update/:id',updateUser);
user_router.delete('/delete/:id',deleteUser);

export default user_router;