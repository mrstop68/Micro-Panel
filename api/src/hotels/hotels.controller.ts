import { Body, Controller, Get, Post } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { Hotel } from './interface/hotel.interface';
import { CreateHotelDto } from './dto/create-hotel-dto';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}
  @Get()
  async findAll(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }
  @Post()
  create(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.hotelsService.create(createHotelDto);
  }
}
