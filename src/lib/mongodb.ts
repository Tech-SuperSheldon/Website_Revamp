import { MongoClient, Db } from "mongodb";

const dbName = process.env.MONGODB_DB ?? "pre-sales-crm";

let cachedClient: MongoClient | null = null;
let cachedPromise: Promise<MongoClient> | null = null;

export async function getDb(): Promise<Db> {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is not defined");

  if (!cachedPromise) {
    cachedClient = new MongoClient(uri);
    cachedPromise = cachedClient.connect();
  }

  const client = await cachedPromise;
  return client.db(dbName);
}
