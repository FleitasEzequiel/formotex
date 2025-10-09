import {hash,compare} from "bcrypt"


//Estos son las funciones de encriptación para los contraseñas

//Este de acá encripta
export const hashValue = async(value: string) => {
    return await hash(value.toString(),10)}

//Este de acá compara un texto plano con el valor encriptado
export const compareHash = async(value:string, hash:string) => (await compare(value,hash))