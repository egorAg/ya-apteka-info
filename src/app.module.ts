import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    InfoModule,
  ],
})
export class AppModule {}
