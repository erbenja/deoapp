import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {PostService} from "../post/post.service";
import {PostDTO} from "../post/post.dto";
import {apiPrefix} from "../shared/api.constants";
import {OlympiadYearService} from "./olympiad-year.service";
import {OlympiadYearDTO, OlympiadYearRO} from "./olympiad-year.dto";
import {OlympiadRoundService} from "../olympiad-round/olympiad-round.service";
import {OlympiadRoundDTO, OlympiadRoundRO} from "../olympiad-round/olympiad-round.dto";
import {ContestantService} from "../contestant/contestant.service";
import {ContestantDTO, ContestantRO} from "../contestant/contestant.dto";
import {allRelations} from "./olympiad-year.constants";
import {ApiOkResponse} from "@nestjs/swagger";

@Controller(apiPrefix + 'olympiadyears')
export class OlympiadYearController {
    constructor(private service: OlympiadYearService,
                private roundService: OlympiadRoundService,
                private contestantsService: ContestantService){}


    @Get()
    @ApiOkResponse({type: [OlympiadYearRO]})
    getAllYears(){
        const result = this.service.getAll(allRelations);
        return result;
    }

    @ApiOkResponse({type: OlympiadYearRO})
    @Get(':id')
    getYearById(
        @Param('id', ParseIntPipe) id
    ){
        const result = this.service.getById(id,allRelations);
        return result;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createYear(
        @Body() olympiadYearDTO: OlympiadYearDTO
    ) {
        const result = this.service.create(olympiadYearDTO);
        return result;
    }

    @Put(':id')
    // @UsePipes(ValidationPipe)
    updateYear(
        @Param('id', ParseIntPipe) id,
        @Body() olympiadYearDTO: OlympiadYearDTO
    ){
        olympiadYearDTO.id = id;
        const result = this.service.update(olympiadYearDTO);
        return result;
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteYear(
        @Param('id', ParseIntPipe) id,
    ){
        const result = this.service.delete(id);
        return result;
    }


    //ROUNDS
    @ApiOkResponse({type: [OlympiadRoundRO]})
    @Get(':id/olympiadrounds')
    getRoundsByYearId(
        @Param('id', ParseIntPipe) id,
    ){
        return this.roundService.getAllByYearId(id);
    }


    @Post(':id/olympiadrounds')
    // @UsePipes(ValidationPipe)
    createRoundInYearId(
        @Param('id', ParseIntPipe) id,
        @Body() olympiadRoundDTO: OlympiadRoundDTO
    ){
        olympiadRoundDTO.yearId = id;
        return this.roundService.create(olympiadRoundDTO);
    }

    //CONTESTANTS
    @ApiOkResponse({type: [ContestantRO]})
    @Get(':id/contestants')
    getContestantByRoundId(
        @Param('id', ParseIntPipe) id,
    ){
        return this.contestantsService.getAllBYOlympiadYear(id);
    }


    @Post(':id/contestants')
    @UsePipes(ValidationPipe)
    createContestantInYearId(
        @Param('id', ParseIntPipe) id,
        @Body() contestantDTO: ContestantDTO
    ){
        contestantDTO.yearId = id;
        return this.contestantsService.create(contestantDTO);
    }

}
