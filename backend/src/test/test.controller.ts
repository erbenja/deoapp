import {Body, Controller, Get, Param, ParseIntPipe, Post, Put, SetMetadata, UseGuards, UsePipes} from '@nestjs/common';
import {TestService} from "./test.service";
import {apiPrefix} from "../shared/api.constants";
import {TestDTO, TestRO} from "./test.dto";
import {ValidationPipe} from "../shared/validation.pipe";
import {QuestionService} from "../question/question.service";
import {QuestionDTO, QuestionOrderDTO, QuestionRO} from "../question/question.dto";
import {allRelations} from "./test.constants";
import {ROargs} from "../shared/base-ro";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {ApiOkResponse} from "@nestjs/swagger";
import {ContactPersonRO} from "../contact-person/contact-person.dto";

@Controller(apiPrefix + 'tests')
export class TestController {
    constructor(private service: TestService,
                private questionsService: QuestionService) {
    }

    @ApiOkResponse({type: [TestRO]})
    @Get()
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    getAllTests() {
        return this.service.getAll(allRelations, {}, {});
    }

    @ApiOkResponse({type: TestRO})
    @Get('/example')
    getExampleTest(
        // @Param('id', ParseIntPipe) id,
    ) {
        return this.service.getById(10000, allRelations, {});
    }

    @ApiOkResponse({type: [TestRO]})
    @Get(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin', 'guarantee'])
    getTestById(
        @Param('id', ParseIntPipe) id,
    ) {
        const args = new ROargs();
        args.correctAnswers = true
        return this.service.getById(id, allRelations, {}, args);
    }

    @Put(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    @UsePipes(ValidationPipe)
    updateTestById(
        @Param('id', ParseIntPipe) id,
        @Body() testDTO: TestDTO
    ) {
        testDTO.id = id;
        return this.service.update(testDTO);
    }

    //QUESTIONS
    @ApiOkResponse({type: [QuestionRO]})
    @Get(':id/questions')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    getAllQuestionInTest(
        @Param('id', ParseIntPipe) id,
    ) {

        return this.questionsService.getQuestionsByTestId(id);
    }

    @Post(':id/questions')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    @UsePipes(ValidationPipe)
    addQuestionInTest(
        @Param('id', ParseIntPipe) id,
        @Body() questionDTO: QuestionDTO
    ) {
        questionDTO.testId = id;
        return this.questionsService.create(questionDTO);
    }

    @Put(':id/questionsOrder')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    @UsePipes(ValidationPipe)
    updateOrderInTest(
        @Param('id', ParseIntPipe) id,
        @Body() orderDTO: QuestionOrderDTO
    ) {
        orderDTO.testId = id;
        return this.service.orderQuestionInTest(orderDTO);
    }
}
