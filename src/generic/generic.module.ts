import { Module } from '@nestjs/common';
import { GenericController } from './generic.controller';
import { GenericService } from './generic.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [GenericController],
  providers: [GenericService],
})
export class GenericModule {}
