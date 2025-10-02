import { InsertOneResult } from "mongodb";
import db from "../utils/database";
import generarOID from "../utils/generarOID";

export const addEquipo = async(equipo: {}) : Promise<InsertOneResult<Document>> => {
    const equiponuevo = await db.insert("Equipos",equipo)
    return equiponuevo
}
export const getEquipos = async () => await db.get("Equipos");

export const getEquipo = async (id: string) => {
    const oid = await generarOID(id);
    if (oid == null) return new Error("Nao nao")
    const equipo = await db.getOne("Equipos",{_id: oid})
    return equipo
};
