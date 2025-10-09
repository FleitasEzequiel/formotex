import { ObjectId } from "mongodb";
import { IUsuario } from "../Interfaces/IUsuario";
import { Equipo } from "./Equipo";

export abstract class Usuario implements IUsuario {
    readonly _id : ObjectId
    public abstract readonly rol : "Empleado" | "Administrador"
    constructor(public email: string,public contrasenia: string, _id?: ObjectId ){
        this._id = _id || new ObjectId()
    }    
    aJSON(){
        return {
            "_id":this._id,
            "email":this.email,
            "contrasenia":this.contrasenia,
            "rol":this.rol
        }
    }
}

export class Admin extends Usuario {
    public readonly rol = "Administrador"
    constructor(email:string, contraseña: string){
    super(email,contraseña)
    } 
}

export class Empleado extends Usuario {
    public readonly rol = "Empleado"
    Equipos: Equipo[] 
     constructor(email: string, contraseña: string, _id?: ObjectId, equipos?: Equipo[]){
        super(email, contraseña, _id)
        this.Equipos = equipos || []
     }
     cambiarEstadoEquipo(equipo: Equipo,nuevoEstado: "Listo" | "En mantenimiento"): void {
        equipo.cambiarEstado(nuevoEstado)
     }
     verEquipos(): Equipo[] {
        return this.Equipos
     }
     
    public static valido(objeto: any): objeto is Empleado{
        if(typeof objeto !== "object" || objeto=== null)  return false
        const tieneId = '_id' in objeto && ObjectId.isValid(objeto._id)
        const tieneEmail = 'email' in objeto && typeof objeto.email == "string"
        const tieneContrasenia = 'contrasenia' in objeto && typeof objeto.contrasenia == "string"
        const tieneRol = 'rol' in objeto && ((objeto.rol == "Administrador") || (objeto.rol == "Empleado"))
        return tieneId && tieneEmail && tieneContrasenia && tieneRol
    } 
    public static deJSON(JSON:{_id: ObjectId, email: string,contrasenia: string}): Empleado {
        return new Empleado(JSON.email,JSON.contrasenia,JSON._id)
    }
}
