import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';
import { AssetEntity } from './asset.entity';


const OrmModule = TypeOrmModule.forFeature([ AssetEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ AssetController ],
  providers: [ AssetService ],
  exports: [ AssetService ]
})
export class AssetModule {}
