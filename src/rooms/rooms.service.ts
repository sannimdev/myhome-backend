import { Injectable } from '@nestjs/common';
import { getRooms } from '../lib/mongo';
import { Room } from '../type/land';

type Response = {
    data: Room[];
    length: number;
};
@Injectable()
export class RoomsService {
    async getAllRooms(/*{ offset = 0, limit = 0 }*/): Promise<Response> {
        const rooms = (await getRooms()) as Room[];

        return {
            data: rooms,
            length: rooms.length,
        };
    }
}
