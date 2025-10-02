import { Handler, NextFunction, Request, Response } from "express"
import { addEquipo, getEquipo, getEquipos } from "../Services/EquiposServices"

export const getByIdController : Handler = async (req: Request,res: Response, _next: NextFunction ) =>{
    const { id } = req.params
    const equipo = await getEquipo(id)
    res.send(equipo)
 }

export const addController : Handler = async(req: Request, res: Response, _next: NextFunction) => {
    const {nombre, marca, user} = req.body
    const resultado = await addEquipo({nombre, marca, user})
    res.send(resultado)
}

export const getController : Handler = async (_req: Request, res: Response, _next : NextFunction) => {
    const equipos = await getEquipos()
    res.send(equipos)
 }

