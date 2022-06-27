import { parse } from 'path';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { Room } from '../type/land';

// Connection URL
const { parsed: env } = dotenv.config({
    path: `${parse(__dirname).dir}/../.env`,
});
console.log('계정 =======================');
const id = env ? env.MONGODB_ID : process.env.MONGODB_ID;
const pw = env ? env.MONGODB_PW : process.env.MONGODB_PW;
const dbName = env ? env.MONGODB_NAME : process.env.MONGODB_NAME;
console.log(`id ${!!id}, pw ${!!pw}, dbName ${!!dbName}`);

const url = `mongodb+srv://${id}:${pw}@cluster0.scwj7.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url);
export const openMongo = async () => client.connect();
export const closeMongo = async () => client.close();

export async function addDocument(collectionName: string, elements: any[]) {
    try {
        console.log('Connected successfully to server');
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        // the following code examples can be pasted here...
        const insertResult = await collection.insertMany(elements);
        return insertResult;
    } catch (e) {
        console.error('add Document', e);
        throw e;
    }
}

export async function getRooms(): Promise<Room[] | Error> {
    try {
        const db = client.db(dbName);
        const collection = db.collection('room');
        return collection.find().toArray() as unknown as Promise<Room[]>;
    } catch (e) {
        console.error('getRooms', e);
        throw e;
    }
}

export async function getRoom(articleNo: number | string) {
    try {
        const db = client.db(dbName);
        const collection = db.collection('room');
        const result = await collection.find({ atclNo: articleNo }).toArray();
        return result;
    } catch (e) {
        console.error('getRoom', e);
        throw e;
    }
}
