import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Put,
    SetMetadata,
    UseGuards,
    UsePipes
} from '@nestjs/common';
import {QuestionOptionEntity} from "./question-option.entity";
import {QuestionOptionService} from "./question-option.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {QuestionDTO, QuestionRO} from "../question/question.dto";
import {QuestionOptionDTO, QuestionOptionRO} from "./question-option.dto";
import {apiPrefix} from "../shared/api.constants";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {ApiOkResponse} from "@nestjs/swagger";

@Controller(apiPrefix + 'questionoptions')
export class QuestionOptionController {
    constructor(private service: QuestionOptionService){}

    @ApiOkResponse({type: QuestionOptionRO})
    @Get(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    getOptionById(
        @Param('id', ParseIntPipe) id,
    ){
        return this.service.getById(id);
    }

    @Put(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    @UsePipes(ValidationPipe)
    updateOptionById(
        @Param('id', ParseIntPipe) id,
        @Body() optionDTO: QuestionOptionDTO
    ){
        optionDTO.id = id;
        return this.service.update(optionDTO);
    }

    @Delete(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', ['creator', 'admin'])
    deleteOptionById(
        @Param('id', ParseIntPipe) id,
    ){
        return this.service.delete(id);
    }
}
