import {Router} from "express"
import { addController, getByIdController, getController} from "../Controllers/EquiposController"

const EquiposRoutes = Router()

EquiposRoutes.post("/add",addController)
EquiposRoutes.get("/get",getController)
EquiposRoutes.get("/id/:id",getByIdController)

export default EquiposRoutes