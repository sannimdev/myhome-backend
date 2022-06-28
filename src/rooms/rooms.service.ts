import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { closeMongo, getMongoClient, getRooms, openMongo } from 'src/lib/mongo';
import { Room } from 'src/type/land';

type Response = {
    data: Room[];
    length: number;
};
@Injectable()
export class RoomsService {
    getAllRooms(/*{ offset = 0, limit = 0 }*/): Promise<Response> {
        const client = getMongoClient();
        return this.executeQuery(client, async () => {
            const rooms = (await getRooms(client)) as Room[];
            return {
                data: rooms,
                length: rooms.length,
            };
        });
    }

    private async executeQuery(client: MongoClient, callback: () => any) {
        try {
            await openMongo(client);
            return await callback();
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            await closeMongo(client);
        }
    }
}
