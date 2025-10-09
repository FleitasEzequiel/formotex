import { InsertOneResult, ObjectId } from "mongodb";
import db from "../utils/database";
import generarOID from "../utils/generarOID";
import { Equipo } from "../Classes/Equipo";
import { Admin, Empleado } from "../Classes/Usuario";

class EquiposServices {
  constructor() { }
  public añadirEquipo = async (
    equipo: Equipo
  ): Promise<InsertOneResult<Document>> => {
    console.log("añadir", equipo);
    const equiponuevo = await db.insert("Equipos", equipo.aJSON());
    return equiponuevo;
  };

  public obtenerEquipos = async () => {
    return await db.get("Equipos");
  };

  public obtenerEquipoPorId = async (id: string) => {
    console.log("Acá", id);
    const oid = await generarOID(id);
    console.log(oid);
    if (oid == null) return null;
    const equipo = await db.getOne("Equipos", { _id: oid });
    console.log("return", equipo);
    return equipo;
  };
  public obtenerEquiposPorUsuario = async (user: ObjectId) => {
    return await db.get("Equipos", { responsable: user });
  };
  public asignarEquipo = async (equipo: Equipo, usuario: Empleado) => {
    const oid = await generarOID(`${equipo._id}`);
    if (oid == null) return new Error("El id no es valido.");
    return await db.modify(
      "Equipos",
      {
        _id: oid,
      },
      {
        $set: {
          responsable: usuario,
        },
      }
    );
  };

  public actualizarEquipo = async (equipo: Equipo) => {
    equipo.cambiarEstado(
      equipo.estado == "En mantenimiento" ? "Listo" : "En mantenimiento"
    );
    return await db.change("Equipos", { _id: equipo._id }, equipo.aJSON());
  };
  public eliminarEquipo = async (id: ObjectId | string) => {
    try {
      const oid = typeof id == "string" ? await generarOID(id) : id;
      if (oid == null) throw new Error("Error con el OID");
      return await db.delete("Equipos", { _id: oid });
    } catch (error) { }
  };
}

export default EquiposServices