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
import {QuestionService} from "./question.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {TestDTO} from "../test/test.dto";
import {QuestionDTO, QuestionRO} from "./question.dto";
import {apiPrefix} from "../shared/api.constants";
import {QuestionOptionDTO, QuestionOptionRO} from "../question-option/question-option.dto";
import {QuestionOptionService} from "../question-option/question-option.service";
import {AnsweredQuestionDTO, AnsweredQuestionRO} from "../answered-question/answered-question.dto";
import {AnsweredQuestionService} from "../answered-question/answered-question.service";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {ContestantsGuard} from "../auth/contestants.guard";
import {AuthCodeId, AuthGuaranteeId} from "../auth/auth.dto";
import {RolesGuard} from "../auth/roles.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {PostRO} from "../post/post.dto";

@Controller(apiPrefix + 'questions')
export class QuestionController {
    constructor(private service: QuestionService,
                private optionsService: QuestionOptionService,
                private answersService: AnsweredQuestionService) {
    }

    @ApiOkResponse({type: QuestionRO})
    @Get(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    getQuestionById(
        @Param('id', ParseIntPipe) id,
    ) {
        return this.service.getById(id);
    }

    @Put(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    @UsePipes(ValidationPipe)
    updateQuestionById(
        @Param('id', ParseIntPipe) id,
        @Body() questionDTO: QuestionDTO
    ) {
        questionDTO.id = id;
        return this.service.update(questionDTO);
    }

    @Delete(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    deleteQuestionById(
        @Param('id', ParseIntPipe) id,
    ) {
        return this.service.delete(id);
    }

    @Post()
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    @UsePipes(ValidationPipe)
    addQuestionInTest(
        @Body() questionDTO: QuestionDTO
    ) {
        return this.service.create(questionDTO);
    }


    //QUESTION OPTIONS
    @ApiOkResponse({type: QuestionOptionRO})
    @Get(':id/questionoptions')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    getAllOptions(
        @Param('id', ParseIntPipe) id,
    ) {
        return this.optionsService.getAllByQuestionId(id);
    }

    @ApiOkResponse({type: QuestionOptionRO})
    @Get(':qid/questionoptions/:id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    getOptionById(
        @Param('qid', ParseIntPipe) qid,
        @Param('id', ParseIntPipe) id,
    ) {
        return this.optionsService.getById(id);
    }


    @Post(':id/questionoptions')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    @UsePipes(ValidationPipe)
    addQuestionOption(
        @Param('id', ParseIntPipe) id,
        @Body() optionDTO: QuestionOptionDTO,
    ) {
        optionDTO.questionId = id;
        return this.optionsService.create(optionDTO);
    }


    //ANSWERS
    @ApiOkResponse({type: AnsweredQuestionRO})
    @Get(':id/answeredquestions')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['evaluator', 'creator', 'admin'])
    getAllAnswers(
        @Param('id', ParseIntPipe) id,
    ) {
        return this.answersService.getAllByQuestionId(id);
    }


    @Post(':id/answeredquestions')
    @UseGuards(JwtAccessAuthGuard, ContestantsGuard)
    @UsePipes(ValidationPipe)
    addQuestionAnswer(
        @AuthCodeId() codeId,
        @Param('id', ParseIntPipe) id,
        @Body() answerDTO: AnsweredQuestionDTO,
    ) {
        console.log(codeId);
        answerDTO.questionId = id;
        answerDTO.accessCodeId = codeId;
        return this.answersService.create(answerDTO);
    }
}
