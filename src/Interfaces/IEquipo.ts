import { ObjectId } from "mongodb"
import { Empleado } from "../Classes/Usuario"

export type TEstado = "En mantenimiento" | "Listo"

export interface IEquipo {
    readonly _id: ObjectId
    nombre: string
    modelo: string,
    marca: string,
    numero: number,
    estado: TEstado,   
    responsable: Empleado
    ubicacion: string
    tipo:string
}

