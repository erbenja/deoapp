import {Controller, Delete, Get, Param, ParseIntPipe, SetMetadata, UseGuards} from "@nestjs/common";
import {apiPrefix} from "../shared/api.constants";
import {PermissionService} from "./permission.service";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {OlympiadYearRO} from "../olympiad-year/olympiad-year.dto";
import {PermissionRO} from "./permission.dto";


@Controller(apiPrefix + 'permissions')
export class PermissionController {
    constructor(private service: PermissionService) {
    }

    @ApiOkResponse({type: PermissionRO})
    @Get()
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', [ 'admin'])
    getAllPermissions() {
        const permissions = this.service.getAll();
        return permissions;
    }

    @Delete(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    deletePermissionById(
        @Param('id', ParseIntPipe) id,
    ){
        return this.service.delete(id);
    }
}
