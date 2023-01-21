import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleEntity } from './rule.entity';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';


const OrmModule = TypeOrmModule.forFeature([ RuleEntity ]);


@Module({
  imports: [
    OrmModule
  ],
  controllers: [ RuleController ],
  providers: [ RuleService ]
})
export class RuleModule {}
