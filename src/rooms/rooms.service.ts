import { Injectable } from '@nestjs/common';
import { COLLECTION_ROOM, COLLECTION_ROOM_DELETED } from 'src/data/configs';
import { getRooms } from '../lib/mongo';
import { GetRoomsParams, Room } from '../type/land';

type Response = {
    data: Room[];
    length: number;
};

@Injectable()
export class RoomsService {
    async getAllRooms({
        offset,
        limit,
        keyword,
    }: GetRoomsParams): Promise<Response> {
        const rooms = (await getRooms(
            { offset, limit, keyword },
            COLLECTION_ROOM,
        )) as Room[];

        return {
            data: rooms,
            length: rooms.length,
        };
    }

    async getDeletedRooms({
        offset,
        limit,
        keyword,
    }: GetRoomsParams): Promise<Response> {
        const rooms = (await getRooms(
            { offset, limit, keyword },
            COLLECTION_ROOM_DELETED,
        )) as Room[];

        return {
            data: rooms,
            length: rooms.length,
        };
    }
}
