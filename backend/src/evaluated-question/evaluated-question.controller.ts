import {Body, Controller, Delete, Get, Param, Put, SetMetadata, UseGuards, UsePipes} from '@nestjs/common';
import {apiPrefix} from "../shared/api.constants";
import {EvaluatedQuestionService} from "./evaluated-question.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {EvaluatedQuestionDTO, EvaluatedQuestionRO} from "./evaluated-question.dto";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {DistrictRO} from "../district/district.dto";

@Controller(apiPrefix + 'evaluatedquestions')
export class EvaluatedQuestionController {
    constructor(private service: EvaluatedQuestionService){}

    @ApiOkResponse({type: EvaluatedQuestionRO})
    @Get(':id')
    getEvaluationById(
        @Param('id') id: number
    ){
        return this.service.getById(id);
    }

    @Put(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['evaluator', 'admin'])
    @UsePipes(ValidationPipe)
    updateEvaluationById(
        @Param('id') id: number,
        @Body() answerDTO: EvaluatedQuestionDTO
    ){
        answerDTO.id = id;
        return this.service.update(answerDTO);
    }

    @Delete(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', [ 'admin'])
    deleteEvaluationById(
        @Param('id') id: number
    ){
        return this.service.delete(id);
    }
}
