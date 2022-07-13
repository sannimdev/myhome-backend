import { Controller, Get, ParseIntPipe, Query, UsePipes } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Get()
    @UsePipes(ParseIntPipe)
    getRooms(
        // @Request() req,
        @Query('offset') offset: number,
        @Query('limit') limit: number,
    ) {
        return this.roomsService.getAllRooms({ offset, limit });
    }
}
