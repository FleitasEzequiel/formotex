import { ObjectId } from "mongodb";
import { IEquipo,TEstado } from "../Interfaces/IEquipo";
import { Admin, Empleado, Usuario} from "./Usuario";

export class Equipo implements IEquipo{
    readonly _id: ObjectId
    constructor(public responsable: Empleado, public nombre: string,public tipo:string,public modelo: string,public marca: string,public numero: number,public ubicacion:string,public estado: TEstado,_id?: ObjectId){
        this._id = _id || new ObjectId()
    }
    asignarEmpleado(equipo:any , empleado: Empleado, identificador: Admin): void {
        if (!(identificador instanceof Admin)){
            throw new Error("El usuario no tiene permiso de realizar esta acción.")
        }
        
    }
    cambiarEstado(nuevoEstado: TEstado): Equipo{
        this.estado = nuevoEstado
        return this
    }
    static valido(objeto:any) : objeto is Equipo{
        const tieneId = '_id' in objeto && ObjectId.isValid(objeto._id)
        const tieneNombre = 'nombre' in objeto && typeof(objeto.nombre) == "string" 
        const tieneTipo = 'tipo' in objeto && typeof(objeto.tipo) == "string" 
        const tieneModelo = 'modelo' in objeto && typeof(objeto.modelo) == "string" 
        const tieneMarca = 'marca' in objeto && typeof(objeto.marca) == "string" 
        const tieneNumero = 'numero' in objeto && typeof(objeto.numero) == "number" 
        const tieneUbicacion = 'ubicacion' in objeto && typeof(objeto.ubicacion) == "string"
        const tieneResponsable = 'responsable' in objeto &&  (ObjectId.isValid(objeto.responsable) || (Empleado.valido(objeto.responsable)))
        const tieneEstado = 'estado' in objeto && ((objeto.estado == "Listo") || (objeto.estado == "En mantenimiento"))

        return tieneId && tieneNombre && tieneTipo && tieneModelo && tieneMarca && tieneNumero && tieneResponsable && tieneUbicacion && tieneEstado
    }
    aJSON(){
        return {
            "_id":this._id,
            "nombre": this.nombre,
            "modelo":this.modelo,
            "tipo":this.tipo,
            "estado":this.estado,
            "marca":this.marca,
            "ubicacion":this.ubicacion,
            "responsable":this.responsable?._id || this.responsable,
            "numero": this.numero,
        }
    }
    static deJSON(data: IEquipo){
        return new Equipo(data.responsable, data.nombre,data.tipo,data.modelo,data.marca,data.numero,data.ubicacion,data.estado,data._id)
    }
}