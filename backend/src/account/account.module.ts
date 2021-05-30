import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import {AccountService} from "./account.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccountEntity} from "./account.entity";
import {GuaranteeService} from "../guarantee/guarantee.service";
import {GuaranteeModule} from "../guarantee/guarantee.module";
import {PermissionModule} from "../permission/permission.module";

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([AccountEntity]), GuaranteeModule, PermissionModule],
  exports: [AccountService]
})
export class AccountModule {}
