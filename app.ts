import express from "express"
import cookieParser from "cookie-parser"
import UserRoutes from "./src/Routes/UserRoutes"
import EquiposRoutes from "./src/Routes/EquiposRoutes"
const app = express()

//MIDDLEWARES 
app.use(cookieParser())
app.use(express.json())

// RUTAS
app.use("/api/auth/", UserRoutes)
app.use("/api/equipos/", EquiposRoutes)

// LISTEN 
app.listen(3020, () => {
    console.log("Servidor escuchando en 3020")
})
