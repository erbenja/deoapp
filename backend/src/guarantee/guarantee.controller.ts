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
import {GuaranteeService} from "./guarantee.service";
import {apiPrefix} from "../shared/api.constants";
import {GuaranteeDTO, GuaranteeRO} from "./guarantee.dto";
import {ContestantDTO, ContestantRO} from "../contestant/contestant.dto";
import {ContestantService} from "../contestant/contestant.service";
import {allRelations} from "./guarantee.constants";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {AuthGuaranteeId} from "../auth/auth.dto";
import {ApiOkResponse} from "@nestjs/swagger";
import {EvaluatedQuestionRO} from "../evaluated-question/evaluated-question.dto";

@Controller(apiPrefix + 'guarantees')
export class GuaranteeController {
    constructor(private service: GuaranteeService,
                private contestantsService: ContestantService){}

    @ApiOkResponse({type: [GuaranteeRO]})
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['guarantee', 'admin'])
    @Get('contestants')
    @UsePipes(ValidationPipe)
    getAllContestantsOfGuarantee(
        @AuthGuaranteeId() guaranteeId,
    ){
        console.clear();
        console.log(guaranteeId);
        console.log('----------------------------------------------------------------');
        return this.contestantsService.getAllByGuaranteeId(guaranteeId);//(3);
    }

    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin', 'guarantee'])
    @Post('contestants')
    @UsePipes(ValidationPipe)
    addContestantUnderGuarantee(
        // @Param('gid') gid: number,
        // @Param('yid', ParseIntPipe) yid,
        @Body() contestantDTO: ContestantDTO,
    @AuthGuaranteeId() guaranteeId,
    ){
        contestantDTO.guaranteeId = guaranteeId;
        const result = this.contestantsService.create(contestantDTO);
        return result;
    }

    @ApiOkResponse({type: GuaranteeRO})
    @Get(':id')
    getGuaranteeById(
        @Param('id') id
    ){
        const result = this.service.getById(id, allRelations);
        return result;
    }

    @Put(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', [ 'admin'])
    // @UsePipes(ValidationPipe)
    updateGuarantee(
        @Param('id', ParseIntPipe) id,
        @Body() guaranteeDTO: GuaranteeDTO
    ){
        guaranteeDTO.id = id;
        const result = this.service.update(guaranteeDTO);
        return result;
    }

    @Delete(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', [ 'admin'])
    @UsePipes(ValidationPipe)
    deleteGuarantee(
        @Param('id', ParseIntPipe) id,
    ){
        const result = this.service.delete(id);
        return result;
    }

    //CONTESTANTS
    @ApiOkResponse({type: [ContestantRO]})
    @Get(':id/contestants')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['guarantee', 'admin'])
    @UsePipes(ValidationPipe)
    getAllContestantsOfGuaranteeById(
        //TODO guarantee id from jwt token
        @Param('id', ParseIntPipe) id,
        // @AuthGuarantee() guaranteeId,
    ){
        // console.log(guaranteeId);
        // return {};
        return this.contestantsService.getAllByGuaranteeId(id);
    }


    // @Post('olympiadyears/:yid/contestant')
    // @UsePipes(ValidationPipe)
    // addContestantInYearUnderGuarantee(
    //     // @Param('gid') gid: number,
    //     @Param('yid', ParseIntPipe) yid,
    //     @Body() contestantDTO: ContestantDTO
    // ){
    //     contestantDTO.guaranteeId =
    //
    //     contestantDTO.yearId = yid;
    //     contestantDTO.
    //         //TODO
    // }


}
