import { Handler, NextFunction, Request, Response } from "express"
import UserServices from "../Services/UserServices"
import { Admin, Empleado } from "../Classes/Usuario"
import { generarTokenAcceso } from "../utils/jwt"
import handleError from "../utils/handleError"

const userServices = new UserServices()


class UserController {
    constructor() { }
    public login: Handler = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { email, contrasenia } = req.body
            console.log("acá", await userServices.usuarioExiste(email))
            if (!(await userServices.usuarioExiste(email))) throw new Error("El usuario no existe")
            const user = await userServices.obtenerUsuario(new Empleado(email, contrasenia))
            if (user == null) throw new Error("No se encontró el usuario")
            const jwt = generarTokenAcceso(user._id)
            res.cookie("authCookie", jwt)
            res.send("Sesión iniciada.")
        } catch (err) {
            res.status(500).send(handleError(err))
        }
    }

    public obtenerUsuarios: Handler = async (req: Request, res: Response, _next: NextFunction) => {
        try {
            const { auth } = req.body
            if (!auth) throw new Error("No hay usuario.")
            if (auth.rol !== "Administrador")
                throw new Error("No tienes permiso de obtener todos los usuarios.")
            res.send(await userServices.obtenerTodosLosUsuarios())
        } catch (err) {
            res.status(500).send(handleError(err))
        }
    }
    public register: Handler = async (req: Request, res: Response, _next: NextFunction) => {
        const { email, contrasenia, usuario } = req.body
        try {
            if (await userServices.usuarioExiste(email)) throw new Error("El usuario ya existe")
            // Corroborar que es un administrador antes de crear un nuevo usuario
            const primerUsuario = await userServices.esPrimerUsuario()
            if (!usuario && !primerUsuario) throw new Error("No se encontró el usuario.")
            const response = (primerUsuario) ? await userServices.añadirUsuario(new Admin(email, contrasenia)) : usuario.rol == "Administrador" && await userServices.añadirUsuario(new Empleado(email, contrasenia))
            if (!response) throw new Error("Solo los administradores pueden añadir usuarios")
            if (response.acknowledged) return res.send("Usuario agregado: " + response.insertedId)
            throw new Error("No se pudo agregar el usuario.")
        } catch (err) {
            res.status(500).send(handleError(err))
        }
    }
}

export default UserController
