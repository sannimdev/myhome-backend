import { Controller, Get, ParseIntPipe, Query, UsePipes } from '@nestjs/common';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
    constructor(private roomsService: RoomsService) {}

    @Get()
    getRooms(
        // @Request() req,
        @Query('offset', ParseIntPipe) offset: number,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('keyword') keyword: string,
    ) {
        return this.roomsService.getAllRooms({ offset, limit, keyword });
    }

    @Get('/deleted')
    getDeletedRooms(
        // @Request() req,
        @Query('offset', ParseIntPipe) offset: number,
        @Query('limit', ParseIntPipe) limit: number,
        @Query('keyword') keyword: string,
    ) {
        return this.roomsService.getDeletedRooms({ offset, limit, keyword });
    }
}
