import { Controller, Get, Put, Delete, Post, Body, Param, HttpCode, Query } from '@nestjs/common';

import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDTO } from './users.dto';
import { UpdateUserDTO } from './users.dto';
import { PaginationParams } from 'src/common/common.pagination';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(201)
  create(@Body() body: CreateUserDTO): Promise<User> {
    return this.usersService.create(body);
  }

  @Get()
  async findAll(
    @Query() { page, size }: PaginationParams,
  ): Promise<{ users: User[]; count: number }> {
    page = page ?? 1;
    size = size ?? 10;

    const [users, count] = await this.usersService.findAll(page, size);

    return {
      users,
      count,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.usersService.remove(id);
  }

  @Put(':id')
  @HttpCode(200)
  update(@Param('id') id: string, @Body() body: UpdateUserDTO): Promise<User> {
    return this.usersService.update(id, body);
  }
}
