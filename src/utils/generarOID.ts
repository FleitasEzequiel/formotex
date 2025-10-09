import { ObjectId } from "bson";

const generarOID = (id: string) : Promise<ObjectId | null> => {
    return Promise.resolve(ObjectId.isValid(id) ? ObjectId.createFromHexString(id) : null)
}

export default generarOID