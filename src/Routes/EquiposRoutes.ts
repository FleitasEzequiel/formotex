import { Router } from "express"
import express from "express"
import EquiposController from "../Controllers/EquiposController"
import { userHandler } from "../Middlewares/userHandler"

const EquiposRoutes = Router()
const equiposController = new EquiposController()
// Middleware para obtener el usuario
EquiposRoutes.use(userHandler)

// Rutas de Empleados
EquiposRoutes.get("/", equiposController.obtenerEquiposController)
// Rutas de administradores
EquiposRoutes.post("/add", equiposController.añadirEquipoController)
EquiposRoutes.get("/:id", equiposController.getByIdController)
EquiposRoutes.post("/asignar", equiposController.asignarEquipoController)
EquiposRoutes.delete("/eliminar/:id", equiposController.eliminarEquipoController)
EquiposRoutes.patch("/actualizar/:id", equiposController.actualizarEquipoController)
export default EquiposRoutes

