import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Roles } from '../../decor/roles.decorator';
import { Role } from '../../enums/role.enum';
import { AccessTokenGuard } from '../auth/auth.guard';
import { CreateRoleDTO, RoleDTO, UpdateRoleDTO } from './role.dto';
import { RoleService } from './role.service';


@UseGuards(AccessTokenGuard)
@Controller('roles')
export class RoleController {

  constructor(
    private readonly roleService: RoleService) {
  }


  @Roles(Role.Admin)
  @Post()
  public create(@Body() dto: CreateRoleDTO): Promise<RoleDTO> {
    return this.roleService.create(dto)
      .then(entity => plainToInstance(RoleDTO, entity));
  }


  @Get()
  public findAll(): Promise<RoleDTO[]> {
    return this.roleService.findAll()
      .then(entities => plainToInstance(RoleDTO, entities));
  }


  @Get(':id')
  public findOne(@Param('id') id: number): Promise<RoleDTO> {
    return this.roleService.findOne(id)
      .then(entity => plainToInstance(RoleDTO, entity));
  }


  @Roles(Role.Admin)
  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateRoleDTO): Promise<unknown> {
    return this.roleService.update(id, dto)
      .then(entity => plainToInstance(RoleDTO, entity));
  }


  @Roles(Role.Admin)
  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}
