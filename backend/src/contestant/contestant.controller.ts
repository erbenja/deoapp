import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put, SetMetadata,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {ContestantService} from "./contestant.service";
import {ContestantDTO, ContestantRO} from "../contestant/contestant.dto";
import {AccessCodeService} from "../access-code/access-code.service";
import {apiPrefix} from "../shared/api.constants";
import {allRelations} from "./contestant.constants";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {ContactPersonRO} from "../contact-person/contact-person.dto";
import {AccessCodeRO} from "../access-code/access-code.dto";

@Controller(apiPrefix + 'contestants')
export class ContestantController {
    constructor(private service: ContestantService,
                private codesService: AccessCodeService) {
    }


    @ApiOkResponse({type: ContestantRO})
    @Get(':id')
    getContestantById(
        @Param('id', ParseIntPipe) id,
    ) {
        const result = this.service.getById(id, allRelations);
        return result;
    }

    @ApiOkResponse({type: ContestantRO})
    @Put(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['guarantee', 'admin'])
    @UsePipes(ValidationPipe)
    updateContestant(
        @Param('id', ParseIntPipe) id,
        @Body() contestantDTO: ContestantDTO
    ) {
        contestantDTO.id = id;
        const result = this.service.update(contestantDTO);
        return result;
    }

    @Delete(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin'])
    @UsePipes(ValidationPipe)
    deleteContestant(
        @Param('id', ParseIntPipe) id,
    ) {
        const result = this.service.delete(id);
        return result;
    }

    //olympiadround ACCESS CODE
    @ApiOkResponse({type: AccessCodeRO})
    @Get(':cid/olympiadrounds/:rid/accesscode')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['guarantee', 'admin'])
    @UsePipes(ValidationPipe)
    getAccessCodeForRound(
        @Param('cid') cid: number,
        @Param('rid') rid: number,
    ) {
        //TODO
        // return `Code for contestant ${cid} for round ${rid}`;
        return this.codesService.getCodeByContestantIdAndRoundId(cid, rid);
    }
}
