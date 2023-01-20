import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Roles } from '../../../decor/roles.decorator';
import { Role } from '../../../enums/role.enum';
import { AccessTokenGuard } from '../auth/auth.guard';
import { CreateUserDTO, UpdateUserDTO, UserDTO } from './user.dto';
import { UserService } from './user.service';


@Roles(Role.Admin)
@UseGuards(AccessTokenGuard)
@Controller('users')
export class UserController {

  constructor(
    private readonly userService: UserService) {
  }


  @Get()
  public findAll(): Promise<UserDTO[]> {
    return this.userService.findAll()
      .then(entities => plainToInstance(UserDTO, entities));
  }


  @Post()
  public create(@Body() dto: CreateUserDTO): Promise<UserDTO> {
    return this.userService.create(dto)
      .then(entity => plainToInstance(UserDTO, entity));
  }


  @Get(':id')
  public findOne(@Param('id') id: number): Promise<UserDTO> {
    return this.userService.findOne(id)
      .then(entity => plainToInstance(UserDTO, entity));
  }


  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateUserDTO): Promise<UserDTO> {
    return this.userService.update(id, dto)
      .then(entity => plainToInstance(UserDTO, entity));
  }


  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.userService.remove(id);
  }
}