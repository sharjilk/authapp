import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://sharjilk621:M1pjaJl5zWe1PXR6@easygenerator.sjqtr.mongodb.net/authtaskdb',
    ),
    UsersModule,
  ],
})
export class AppModule {}
