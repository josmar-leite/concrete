import { Module } from '@nestjs/common';
import { BackofficeModule } from 'src/modules/backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';
import 'dotenv/config';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    BackofficeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
