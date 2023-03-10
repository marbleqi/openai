// 外部依赖
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// 内部依赖
import { AppService } from './app.service';
import { AppController } from './app.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
