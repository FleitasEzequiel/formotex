import {Router,  IRouter, Request, Response} from "express"
import { loginController, registerController } from "../Controllers/UserController"

const UserRoutes : IRouter = Router()

UserRoutes.post("/login",loginController)
UserRoutes.post("/register", registerController)

export default UserRoutes