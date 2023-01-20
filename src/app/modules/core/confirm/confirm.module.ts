import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmEntity } from './confirm.entity';
import { ConfirmService } from './confirm.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([ ConfirmEntity ])
  ],
  controllers: [],
  providers: [
    ConfirmService
  ],
  exports: [
    ConfirmService
  ]
})
export class ConfirmModule {}
