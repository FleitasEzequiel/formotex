import { Router, IRouter, Request, Response } from "express"
import UserController from "../Controllers/UserController"
import { userHandler } from "../Middlewares/userHandler.ts"
const UserRoutes: IRouter = Router()
const userController = new UserController()
UserRoutes.post("/login", userController.login)
UserRoutes.post("/register", userController.register)
UserRoutes.get("/", userHandler, userController.obtenerUsuarios)
export default UserRoutes