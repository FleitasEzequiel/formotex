import { Handler, NextFunction, Request, Response } from "express";
import EquiposServices from "../Services/EquiposServices";
import { Empleado, Usuario } from "../Classes/Usuario";
import { Equipo } from "../Classes/Equipo";
import handleError from "../utils/handleError";


const equiposServices = new EquiposServices()
class EquiposController {
  public getByIdController: Handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { id } = req.params;
  if (!id) throw new Error("No existe un id")
  const equipo = await equiposServices.obtenerEquipoPorId(id)
  if (!Equipo.valido(equipo)) throw new Error("El equipo no es un equipo válido.")
  res.send(equipo);
};
public añadirEquipoController: Handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const { nombre,auth, marca, usuario, tipo, modelo } = req.body;
    if (typeof nombre != "string")
      throw new Error("Nombre debe ser tipo string");
    if (typeof marca != "string") 
      throw new Error("Marca debe ser tipo string");
    if (typeof modelo != "string")
      throw new Error("Modelo debe ser tipo string");
    if (typeof tipo != "string") 
      throw new Error("Tipo debe ser tipo string");
    if (!(Empleado.valido(usuario)))
      throw new Error("Usuario debe ser de tipo usuario");
    const equipo = new Equipo(
      Empleado.deJSON(usuario) ,
      nombre,
      tipo,
      modelo,
      marca,
      1,
      "en casa",
      "En mantenimiento"
    );
    const { insertedId } = await equiposServices.añadirEquipo(equipo);
    res.send("Se añadió un equipo: " + insertedId );
  } catch (err) {
    res.status(500).send(handleError(err)); 
  }
};
public obtenerEquiposController: Handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const {auth} = req.body
  console.log(auth)
  try {
    const equipos = ((auth as Usuario).rol == "Administrador") ? await equiposServices.obtenerEquipos() : await equiposServices.obtenerEquiposPorUsuario(req.body.auth._id);
    res.send(equipos);
  } catch (err) {
    res.status(500).send(handleError(err));
  }
};

public asignarEquipoController: Handler = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const { auth,usuario, _id } = req.body;
  try {
    const equipo = await equiposServices.obtenerEquipoPorId(_id);
    if (equipo == null) throw new Error("No se encontró el equipo.");
    if (!Equipo.valido(equipo)) throw new Error("El equipo no es valido.")
    const equipoeditado = await equiposServices.asignarEquipo(Equipo.deJSON(equipo), usuario);
    res.status(200).send(equipoeditado);
  } catch (err) {
    res.status(500).send(handleError(err));
  }
};
public eliminarEquipoController: Handler = async (req:Request,res:Response,_next) => {
  try {
    const {id} = req.params
    const respuesta = await equiposServices.eliminarEquipo(id);
    res.send(respuesta)
  } catch (err) {
    res.status(500).send(handleError(err))
  }
}

public actualizarEquipoController: Handler = async(req:Request, res: Response,_next) => {
  try {
    const {auth} = req.body
    const {id} = req.params
    if (!id) throw new Error("No hay id")
    if (!auth) throw new Error("No hay usuario logeado.")
    const equipo = await equiposServices.obtenerEquipoPorId(id)
    if (!equipo) throw new Error("No se pudo obtener el equipo")
      console.log("comoandamos", Equipo.valido(equipo))
      console.log("comoandamos2", equipo)
    if (!Equipo.valido(equipo)) throw new Error("El equipo no es de tipo equipo.")
    const objetoEquipo = Equipo.deJSON(equipo)
    if ((objetoEquipo.responsable == auth._id) || auth.rol == "Administrador"){
      const actualización = await equiposServices.actualizarEquipo(objetoEquipo)
      res.send(actualización)
    }
    throw new Error("No tienes permiso de actualizar este equipo.")
  } catch (err) {
res.status(500).send(handleError(err)) 
  }
}
}

export default EquiposController








