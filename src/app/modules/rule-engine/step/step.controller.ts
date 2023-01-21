import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../../../decor/token.decorator';
import { JwtPayload } from '../../../interfaces/auth.interface';
import { AccessTokenGuard } from '../../core/auth/auth.guard';
import { CreateStepDTO, StepDTO, UpdateStepDTO } from './step.dto';
import { StepService } from './step.service';


@UseGuards(AccessTokenGuard)
@Controller('step')
export class StepController {

  constructor(
    private readonly stepService: StepService) {
  }


  @Post()
  public create(@Body() dto: CreateStepDTO, @TokenPayload() payload: JwtPayload): Promise<StepDTO> {
    return this.stepService.create(dto, payload.sub)
      .then(value => plainToInstance(StepDTO, value));
  }


  @Get()
  public findAll(@TokenPayload() payload: JwtPayload): Promise<StepDTO[]> {
    return this.stepService.findAll(payload.sub)
      .then(value => plainToInstance(StepDTO, value));
  }


  @Get(':id')
  public findOne(@Param('id') id: number): Promise<StepDTO> {
    return this.stepService.findOne(id)
      .then(value => plainToInstance(StepDTO, value));
  }


  @Patch(':id')
  public update(@Param('id') id: number, @Body() dto: UpdateStepDTO): Promise<StepDTO> {
    return this.stepService.update(id, dto)
      .then(value => plainToInstance(StepDTO, value));
  }


  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.stepService.remove(id);
  }
}
