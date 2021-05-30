import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PermissionTypeController} from "./permission-type.controller";
import {PermissionTypeEntity} from "./permission-type.entity";
import {PermissionTypeService} from "./permission-type.service";

@Module({
    controllers: [PermissionTypeController],
    providers: [PermissionTypeService],
    imports: [TypeOrmModule.forFeature([PermissionTypeEntity]),]
})
export class PermissionTypeModule {}
