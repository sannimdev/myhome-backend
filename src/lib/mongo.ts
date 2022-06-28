import { parse } from 'path';
import { MongoClient } from 'mongodb';
import { Room } from '../type/land';
import dotenv from 'dotenv';

// Connection URL
const { parsed: env } = dotenv.config({
    path: `${parse(__dirname).dir}/../.env`,
});
console.log('Mongo library loaded');
const id = env ? env.MONGODB_ID : process.env.MONGODB_ID;
const pw = env ? env.MONGODB_PW : process.env.MONGODB_PW;
const dbName = env ? env.MONGODB_NAME : process.env.MONGODB_NAME;
const status = {
    true: 'ok',
    false: 'not exist',
};
console.log(
    `\tㄴid: ${status[String(!!id)]}, pw ${status[String(!!pw)]}, dbName ${
        status[String(!!dbName)]
    }`,
);

const url = `mongodb+srv://${id}:${pw}@cluster0.scwj7.mongodb.net/?retryWrites=true&w=majority`;
export const getMongoClient = (): MongoClient => new MongoClient(url);
export const openMongo = async (client: MongoClient) => client.connect();
export const closeMongo = async (client: MongoClient) => client.close();

export async function addDocument(
    client: MongoClient,
    collectionName: string,
    elements: any[],
) {
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

export async function getRooms(client: MongoClient): Promise<Room[] | Error> {
    try {
        const db = client.db(dbName);
        const collection = db.collection('room');
        return collection.find().toArray() as unknown as Promise<Room[]>;
    } catch (e) {
        console.error('getRooms', e);
        throw e;
    }
}

export async function getRoom(client: MongoClient, articleNo: number | string) {
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
