import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { TokenPayload } from '../../../decor/token.decorator';
import { JwtPayload } from '../../../interfaces/auth.interface';
import { AccessTokenGuard } from '../../core/auth/auth.guard';
import { AssetService } from './asset.service';
import { AssetDTO, CreateAssetDTO, UpdateAssetDTO } from './dto/asset.dto';

@UseGuards(AccessTokenGuard)
@Controller('asset')
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Post()
  public create(
    @Body() dto: CreateAssetDTO,
    @TokenPayload() payload: JwtPayload,
  ): Promise<AssetDTO> {
    return this.assetService
      .create(dto, payload.sub)
      .then((value) => plainToInstance(AssetDTO, value));
  }

  @Get()
  public findAll(@TokenPayload() payload: JwtPayload): Promise<AssetDTO[]> {
    return this.assetService
      .findAllByOwner(payload.sub)
      .then((value) => plainToInstance(AssetDTO, value));
  }

  @Get(':id')
  public findOne(@Param('id') id: number): Promise<AssetDTO> {
    return this.assetService
      .findOne(id)
      .then((value) => plainToInstance(AssetDTO, value));
  }

  @Patch(':id')
  public update(
    @Param('id') id: number,
    @Body() dto: UpdateAssetDTO,
  ): Promise<AssetDTO> {
    return this.assetService
      .update(id, dto)
      .then((value) => plainToInstance(AssetDTO, value));
  }

  @Delete(':id')
  public remove(@Param('id') id: number): Promise<void> {
    return this.assetService.remove(id);
  }
}
