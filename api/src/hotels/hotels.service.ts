import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from './interface/hotel.interface';
@Injectable()
export class HotelsService {
  constructor(
    @InjectModel('Hotel') private readonly hotelModel: Model<Hotel>,
  ) {}
  async findAll(): Promise<Hotel[]> {
    return await this.hotelModel.find();
  }
  async create(hotel: Hotel): Promise<Hotel> {
    const newHotel = new this.hotelModel(hotel);
    return await newHotel.save();
  }
}
