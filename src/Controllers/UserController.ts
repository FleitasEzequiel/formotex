import { Handler, NextFunction, Request, Response } from "express"
import { addUser, getUser, userExists } from "../Services/UserServices"

export const loginController : Handler = async(req: Request,res: Response, _next: NextFunction ) =>{
    const { email, contrasenia } = req.body
    if (!(await userExists(email))) return new Error("El usuario no existe")
    const user = await getUser(email,contrasenia)
    if (user == null) return new Error("No se encontró el usuario")
    res.send(user) 
 }

export const registerController : Handler = async (req: Request, res: Response, _next : NextFunction) => {
    const { nombre, email, contrasenia }  = req.body
    try {
        if (await userExists(email)) throw new Error("El usuario ya existe")
        const response = await addUser({nombre,email,contrasenia})
        if(response.acknowledged) return res.send("Usuario agregado: " + response.insertedId)
        throw new Error("No se pudo agregar el usuario.")
    } catch (err) {
        console.log("acá")
        if (err instanceof Error){
            res.status(500).send(err.message)
        }
    }
 }
