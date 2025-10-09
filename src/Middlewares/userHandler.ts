import { Handler, NextFunction, Request, Response } from "express"
import { decodificarTokenAcceso } from "../utils/jwt"
import UserServices from "../Services/UserServices"
import { ObjectId } from "mongodb"


const services = new UserServices()
export const userHandler: Handler = async (req: Request, res: Response, next: NextFunction) => {
    req.body = req?.body ? req.body : {}
    req.body.auth = undefined
    try {
        const authCookie = req.cookies?.authCookie || req.headers.auth
        if (authCookie === undefined) throw new Error
        const { payload, error } = decodificarTokenAcceso(authCookie)
        if (error) throw Error(error)
        if (payload) {
            const sessionInfo = await services.obtenerUsuarioPorId(ObjectId.createFromHexString(payload._id))
            req.body.auth = sessionInfo
        }
    } catch (error) {
        req.body.error = { error }
    }
    finally { next() }
}