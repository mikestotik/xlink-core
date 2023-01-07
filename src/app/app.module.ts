import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfiguration } from './config/database.config';
import { AccountModule } from './modules/account/account.module';
import { ActionModule } from './modules/action/action.module';
import { AssetModule } from './modules/asset/asset.module';
import { AuthModule } from './modules/auth/auth.module';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { ConfirmModule } from './modules/confirm/confirm.module';
import { DeviceModule } from './modules/device/device.module';
import { EventModule } from './modules/event/event.module';
import { HealthModule } from './modules/health/health.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { RoleModule } from './modules/role/role.module';
import { RuleModule } from './modules/rule/rule.module';
import { StepModule } from './modules/step/step.module';
import { UserModule } from './modules/user/user.module';
import { WidgetModule } from './modules/widget/widget.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
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
    DeviceModule,
    WidgetModule,
    StepModule,
    RuleModule,
    RecipeModule,
    ActionModule,
    AssetModule,
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
