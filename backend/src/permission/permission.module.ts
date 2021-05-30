import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PermissionEntity} from "./permission.entity";
import {PermissionController} from "./permission.controller";
import {PermissionService} from "./permission.service";
import {AccountEntity} from "../account/account.entity";
import {PermissionTypeEntity} from "../permission-type/permission-type.entity";

@Module({
    controllers: [PermissionController],
    providers: [PermissionService],
    imports: [TypeOrmModule.forFeature([PermissionEntity, AccountEntity, PermissionTypeEntity])],
    exports: [TypeOrmModule.forFeature([PermissionEntity]), PermissionService]
})
export class PermissionModule {}
