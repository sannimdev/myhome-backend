import { parse } from 'path';
import { Collection, Db, MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { GetRoomsParams, Room } from '../type/land';
import { COLLECTION_ROOM, COLLECTION_ROOM_DELETED } from '../data/configs';
import { Get, NotFoundException } from '@nestjs/common';

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
const getMongoClient = (): MongoClient => new MongoClient(url);
const openMongo = async (client: MongoClient) => client.connect();
const closeMongo = async (client: MongoClient) => client.close();

export async function executeQuery(
    collectionName: string,
    callback: (collection: Collection, db: Db) => any,
) {
    const client = await openMongo(getMongoClient());
    try {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        return await callback(collection, db);
    } catch (error) {
        console.error(error);
        throw error;
    } finally {
        await closeMongo(client);
    }
}

export async function addDocuments(collectionName: string, elements: any[]) {
    try {
        console.log('Connected successfully to server');
        return executeQuery(collectionName, (collection) =>
            collection.insertMany(elements),
        );
    } catch (e) {
        console.error('add Document', e);
        throw e;
    }
}

type roomTypes = typeof COLLECTION_ROOM | typeof COLLECTION_ROOM_DELETED;
export async function getRooms(
    { offset = 0, limit = 20 }: GetRoomsParams,
    roomType: roomTypes,
): Promise<Room[] | Error> {
    try {
        const rooms = await executeQuery(
            roomType,
            (collection) =>
                collection
                    .find()
                    .skip(offset)
                    .limit(limit)
                    .toArray() as unknown as Promise<Room[]>,
        );
        if (!rooms) {
            throw new NotFoundException();
        }
        return rooms;
    } catch (e) {
        console.error('getRooms', e);
        throw e;
    }
}
