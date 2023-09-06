import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { GenericService } from './generic.service';

@Controller('generic')
export class GenericController {
  constructor(private readonly genericService: GenericService) {}

  @Post()
  async create(@Body() data: any): Promise<any> {
    return this.genericService.create(data);
  }

  @Post('/findAll')
  async findAll(@Body() data: any): Promise<any> {
    return this.genericService.findAll(data);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.genericService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<any> {
    return this.genericService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.genericService.delete(id);
  }
}
