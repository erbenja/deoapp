import {Controller, Get, Param} from '@nestjs/common';
import {apiPrefix} from "../shared/api.constants";
import {QuestionTypeService} from "./question-type.service";
import {ApiOkResponse} from "@nestjs/swagger";
import {QuestionRO} from "../question/question.dto";
import {QuestionTypeRO} from "./question-type.dto";

@Controller(apiPrefix + 'questiontypes')
export class QuestionTypeController {
    constructor(private service: QuestionTypeService){}

    @ApiOkResponse({type: [QuestionTypeRO]})
    @Get()
    getAllTypes(
    ){
        return this.service.getAll();
    }

    @ApiOkResponse({type: QuestionTypeRO})
    @Get(':id')
    getTypeById(
        @Param('id') id: number
    ){
        return this.service.getById(id);
    }
}
