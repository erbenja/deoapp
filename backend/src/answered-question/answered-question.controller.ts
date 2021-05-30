import {Body, Controller, Get, Param, ParseIntPipe, Post, Put, SetMetadata, UseGuards, UsePipes} from '@nestjs/common';
import {AnsweredQuestionService} from "./answered-question.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {QuestionDTO} from "../question/question.dto";
import {apiPrefix} from "../shared/api.constants";
import {AnsweredQuestionDTO, AnsweredQuestionRO} from "./answered-question.dto";
import {EvaluatedQuestionService} from "../evaluated-question/evaluated-question.service";
import {EvaluatedQuestionDTO, EvaluatedQuestionRO} from "../evaluated-question/evaluated-question.dto";
import {ApiResponseModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {ApiOkResponse} from "@nestjs/swagger";
import {AuthUserId} from "../auth/auth.dto";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";

@Controller(apiPrefix + 'answeredquestions')
export class AnsweredQuestionController {
    constructor(private service: AnsweredQuestionService,
                private evaluationsService: EvaluatedQuestionService){}

    @ApiOkResponse({type: AnsweredQuestionRO})
    @Get(':id')
    getAnswerById(
        @Param('id', ParseIntPipe) id,
    ){
        return this.service.getById(id);
    }

    @ApiOkResponse({type: AnsweredQuestionRO})
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateAnswerById(
        @Param('id', ParseIntPipe) id,
        @Body() answerDTO: AnsweredQuestionDTO
    ){
        answerDTO.id = id;
        return this.service.update(answerDTO);
    }

    //EVALUATION
    @ApiOkResponse({type: EvaluatedQuestionRO})
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['evaluator', 'admin'])
    @Post(':id/evaluatedquestions')
    @UsePipes(ValidationPipe)
    addEvaluationToAnswer(
        @Param('id', ParseIntPipe) id,
        @Body() evaluationDTO: EvaluatedQuestionDTO,
        @AuthUserId() userId,
    ){
        evaluationDTO.answerId = id;
        evaluationDTO.evaluatorId = userId;
        return this.evaluationsService.create(evaluationDTO);
    }

}
