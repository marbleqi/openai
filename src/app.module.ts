// 外部依赖
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
// 内部依赖
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [AppController],
})
export class AppModule {}
