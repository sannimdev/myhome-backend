import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
    getAllRooms() {
        return [1, 2, 3, 4, 5];
    }
}
