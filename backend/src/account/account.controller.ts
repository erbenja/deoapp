import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    SetMetadata,
    UseGuards,
    UsePipes
} from '@nestjs/common';
import {AccountService} from "./account.service";
import {apiPrefix} from "../shared/api.constants";
import {AccountDTO, AccountRO, LoginDTO} from "./account.dto";
import {ValidationPipe} from "../shared/validation.pipe";
import {GuaranteeDTO} from "../guarantee/guarantee.dto";
import {GuaranteeService} from "../guarantee/guarantee.service";
import {ValidationUtils} from "class-validator/validation/ValidationUtils";
import {PermissionDTO} from "../permission/permission.dto";
import {PermissionService} from "../permission/permission.service";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {EvaluatedQuestionRO} from "../evaluated-question/evaluated-question.dto";


@Controller(apiPrefix + 'accounts')
export class AccountController {

    constructor(private service: AccountService,
                private guaranteeService: GuaranteeService,
                private permissionService: PermissionService) {
    };


    @ApiOkResponse({type: AccountRO})
    @Get(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', [, 'admin'])
    @UsePipes(ValidationPipe)
    getByAccountId(
        @Param('id', ParseIntPipe) id
    ) {
        return this.service.getById(id, ['permissions', 'guarantee']);
    }

    @ApiOkResponse({type: AccountRO})
    @Get()
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    getAllAccounts() {
        return this.service.getAll(['permissions', 'guarantee']);
    }

    @Post()
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', [, 'admin'])
    @UsePipes(ValidationPipe)
    createNewAccount(
        @Body() accountDTO: AccountDTO
    ) {
        return this.service.create(accountDTO);
    }

    @ApiOkResponse({type: AccountRO})
    @Put(':id')
    // @UsePipes(ValidationPipe)
    updateAccount(
        @Param('id', ParseIntPipe) id,
        @Body() accountDTO: AccountDTO
    ) {
        accountDTO.id = id;
        return this.service.update(accountDTO);
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteAccountById(
        @Param('id', ParseIntPipe) id
    ){
        return this.service.delete(id);
    }

    @Post(':id/permissions')
    @UsePipes(ValidationPipe)
    grantPermissionToAccountId(
        @Param('id', ParseIntPipe) id,
        @Body() permissionDTO: PermissionDTO
    ){
        if(permissionDTO.accountId === undefined){
            permissionDTO.accountId = id;
        }
        return this.permissionService.create(permissionDTO);
    }

    //GURANTEE
    @Post(':id/guarantees')
    // @UsePipes(ValidationPipe)
    grantGuaranteeToAccount(
        @Param('id', ParseIntPipe) id,
        @Body() guaranteeDTO: GuaranteeDTO
    ){
        guaranteeDTO.accountId = id;
        // return this.guaranteeService.getRelatedEntities(guaranteeDTO);
        return this.guaranteeService.create(guaranteeDTO);
    }

}
