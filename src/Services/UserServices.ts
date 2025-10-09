import { ObjectId } from "mongodb"
import { Admin, Empleado } from "../Classes/Usuario"
import db from "../utils/database"

class UserServices {
    public esPrimerUsuario = async () => (await db.get("Usuarios")).length == 0
    public usuarioExiste = async (email: Empleado) => ((await db.getOne("Usuarios", { email })) == null) ? false : true
    public añadirUsuario = async (user: Empleado | Admin) => await db.insert("Usuarios", user.aJSON())
    public obtenerUsuario = async (user: Empleado) => await db.getOne("Usuarios", { email: user.email, contrasenia: user.contrasenia })
    public obtenerUsuarioPorId = async (oid: ObjectId) => await db.getOne("Usuarios", { _id: oid })
    public obtenerTodosLosUsuarios = async () => await db.get("Usuarios")
}



export default UserServices

