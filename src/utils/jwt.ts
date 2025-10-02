import {decode,Jwt, sign,JwtPayload, verify, TokenExpiredError} from "jsonwebtoken"
import { ObjectId } from "mongodb"

//Esto de acá es para que Visual sepa qué es lo que devuelve el JWT y no se retobe
type accessTokenPayload = {
    "_id":string
    "iat":string
    "exp":string
}

//Esta función crea un JsonWebToken
export const generateAccessToken = (ID : ObjectId) => sign({
    "_id":ID
},"mysecret",{
    "expiresIn":"4h"
})  

//Esto de acá decodifica el JsonWebToken
export const decodeAccessToken = <TPayload extends object = accessTokenPayload>(token: string) => {
    try {
        const payload = verify(token,"mysecret") as TPayload
        return {payload} 
    } catch (error: any) {
        return {"error":error.message}
    }
}