import {
    Body,
    Controller,
    Get,
    HttpException, HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put, SetMetadata,
    UseGuards,
    UsePipes
} from '@nestjs/common';
import {AccessCodeService} from "./access-code.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {AnsweredQuestionDTO} from "../answered-question/answered-question.dto";
import {EvaluatedQuestionDTO} from "../evaluated-question/evaluated-question.dto";
import {AccessCodeDTO} from "./access-code.dto";
import {apiPrefix} from "../shared/api.constants";
import {AnsweredQuestionService} from "../answered-question/answered-question.service";
import {AuthCodeId, AuthCodeTestId} from "../auth/auth.dto";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {AccessCodeGuard} from "../auth/access-code.guard";
import {ContestantsGuard} from "../auth/contestants.guard";
import {TestService} from "../test/test.service";
import {ROargs} from "../shared/base-ro";
import {RolesGuard} from "../auth/roles.guard";

@Controller(apiPrefix + 'accesscodes')
export class AccessCodeController {
    constructor(private service: AccessCodeService, private answersService: AnsweredQuestionService, private testsService: TestService) {
    }

    @UseGuards(JwtAccessAuthGuard, ContestantsGuard)
    @Put('startTest')
    startTest(
        @AuthCodeId() codeId,
    ) {
        // throw new HttpException('asdsad', HttpStatus.UNAUTHORIZED);
        return this.service.startTest(codeId);
    }

    @UseGuards(JwtAccessAuthGuard, ContestantsGuard)
    @Get('getTest')
    getTest(
        @AuthCodeTestId() testId,
    ) {
        return this.testsService.getById(testId);
    }

    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['admin', 'guarantee'])
    @Post(':id/activate')
    activateCode(
        @Param('id', ParseIntPipe) id,
    ) {
        const codeDTO = new AccessCodeDTO();
        codeDTO.activated = new Date();
        codeDTO.id = id;
        return this.service.update(codeDTO);
    }


    @Get(':id/answers')
    getAnswerById(
        @Param('id', ParseIntPipe) id,
    ) {
        const args = new ROargs();
        args.correctAnswers = true;
        return this.answersService.getAllByAccessCodeId(id, args);
    }

    @Get('evaluations')
    getAllForEvaluation() {
        return this.service.getAllForEvaluation();
    }

    @Get('evaluated')
    getAllEvaluated() {
        return this.service.getAllEvaluated();
    }

    @Post(':id/closeevaluation')
    closeEvaluation(
        @Param('id', ParseIntPipe) id,
    ) {
        return this.service.closeEvaluation(id);
    }

}
