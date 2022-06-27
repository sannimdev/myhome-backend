import { Controller, Get } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Get()
    getAllRooms() {
        return this.roomsService.getAllRooms();
    }
}
