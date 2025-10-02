import db from "../utils/database"

export const userExists = async(email: string) => ((await db.getOne("Usuarios", {email})) == null) ? false : true 

export const addUser = async (user : {nombre:string, email:string, contrasenia: string}) => await db.insert("Usuarios",user)

export const getUser = async (email: string,contrasenia: string) => await db.getOne("Usuarios",{email,contrasenia})