import { Handler, NextFunction, Request, Response } from "express"

export const userHandler : Handler = async(req: Request,res: Response,next: NextFunction) =>{
    try {
        const {user} = req.cookies
        if (user === undefined) throw new Error
        const {payload, error} = decodeAccessToken(user)
        if (error)throw Error(error)
        if (payload){
                const sessionInfo = await getSession(payload._id)
                req.body.user = sessionInfo
        }
    } catch (error) {
        req.body.error = {error}
    }
    finally{ next()}
}