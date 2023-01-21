import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './config/database.config';
import { AssetModule } from './modules/asset-manager/asset/asset.module';
import { DeviceModule } from './modules/asset-manager/device/device.module';
import { AccountModule } from './modules/core/account/account.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { ConfirmModule } from './modules/core/confirm/confirm.module';
import { HealthModule } from './modules/core/health/health.module';
import { RoleModule } from './modules/core/role/role.module';
import { RolesGuard } from './modules/core/role/roles.guard';
import { UserModule } from './modules/core/user/user.module';
import { EventModule } from './modules/event/event.module';
import { RecipeModule } from './modules/rule-engine/recipe/recipe.module';
import { RuleModule } from './modules/rule-engine/rule/rule.module';
import { StepModule } from './modules/rule-engine/step/step.module';
import { TriggerModule } from './modules/rule-engine/trigger/trigger.module';
import { WidgetModule } from './modules/widget/widget.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [ '.env' ],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseConfiguration
    }),
    HttpModule,
    HealthModule,
    EventModule,
    UserModule,
    AuthModule,
    RoleModule,
    AccountModule,
    ConfirmModule,
    WidgetModule,
    DeviceModule,
    AssetModule,
    RecipeModule,
    StepModule,
    RuleModule,
    TriggerModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ]
})
export class AppModule {

}
