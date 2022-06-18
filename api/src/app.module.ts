import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { HotelsController } from './hotels/hotels.controller';
// import { HotelsService } from './hotels/hotels.service';
import { HotelModule } from './hotels/hotels.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    HotelModule,
    MongooseModule.forRoot('mongodb://localhost:27017/wp'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
