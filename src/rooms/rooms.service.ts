import { Injectable } from '@nestjs/common';
import { getRooms } from '../lib/mongo';
import { GetRoomsParams, Room } from '../type/land';

type Response = {
    data: Room[];
    length: number;
};

@Injectable()
export class RoomsService {
    async getAllRooms({ offset, limit }: GetRoomsParams): Promise<Response> {
        const rooms = (await getRooms({ offset, limit })) as Room[];

        return {
            data: rooms,
            length: rooms.length,
        };
    }
}
