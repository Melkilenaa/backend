import { Router }from "express";
import { authController } from "../controller/auth.controller";
import { verifyToken } from "../middlewares/verifyToken";

let auth_router = Router();
let controller = new authController();

auth_router.post('/login', controller.login);
auth_router.get('/checkDetails', verifyToken, controller.checkDetails);

export default auth_router;