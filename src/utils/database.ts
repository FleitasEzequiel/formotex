import { MongoClient, WithId, Document, Filter, WithoutId, OptionalId, AggregateOptions, AggregationCursor } from "mongodb";

const DATABASE = "Formotex"
export const client = (): MongoClient => new MongoClient("mongodb://localhost:27017/")

const db =
{
   "insert": async (schema: string, document: OptionalId<Document>) => await client().db(DATABASE).collection(schema).insertOne(document).finally(() => client().close()),
   "get": async (schema: string, filter?: WithoutId<Document>): Promise<WithId<Document>[]> => (await client().db(DATABASE).collection(schema).find(filter || {}).toArray().finally(() => client().close())),
   "getOne": async (schema: string, target: Filter<Document>): Promise<WithId<Document> | null> => client().db(DATABASE).collection(schema).findOne(target).finally(() => client().close()),
   "change": async (schema: string, target: Filter<Document>, document: WithoutId<Document>): Promise<WithId<Document> | null> => client().db(DATABASE).collection(schema).findOneAndReplace(target, document).finally(() => client().close()),
   "aggregate": async (schema: string, target: Document[], options?: AggregateOptions): Promise<AggregationCursor<Document>> => client().db(DATABASE).collection(schema).aggregate(target, options),
   "modify": async (schema: string, target: Filter<Document>, document: WithoutId<Document>): Promise<WithId<Document> | null> => client().db(DATABASE).collection(schema).findOneAndUpdate(target, document).finally(() => client().close()),
   "delete": async (schema: string, document: Filter<Document>) => client().db(DATABASE).collection(schema).findOneAndDelete(document).finally(() => client().close()),
}

export default db