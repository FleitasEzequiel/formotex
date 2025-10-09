import { ErrorRequestHandler} from "express"

const handleError = (error: any)  => {
    if ((error as Error).message !== undefined){
        return (error as Error).message
    }
    return "Error no reconocido"
}

export default handleError