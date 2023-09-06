import { AppMiddleware } from './auth/app.middleware';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GenericModule } from './generic/generic.module';

@Module({
  imports: [GenericModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: any): void {
    //consumer.apply(AppMiddleware).exclude('generic/(.*)').forRoutes('*');
    consumer.apply(AppMiddleware).forRoutes('*');
  }
}
