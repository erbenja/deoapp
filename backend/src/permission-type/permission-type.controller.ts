import {Controller, Get} from "@nestjs/common";
import {apiPrefix} from "../shared/api.constants";
import {PermissionTypeService} from "./permission-type.service";
import {ApiOkResponse} from "@nestjs/swagger";
import {OlympiadYearRO} from "../olympiad-year/olympiad-year.dto";
import {PermissionTypeRO} from "./permission-type.dto";


@Controller(apiPrefix + 'permissiontypes')
export class PermissionTypeController {
    constructor(private service: PermissionTypeService) {
    }

    @ApiOkResponse({type: [PermissionTypeRO]})
    @Get()
    getAllPermissionTypes() {
        return this.service.getAll();
    }
}
