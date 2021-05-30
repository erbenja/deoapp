import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {apiPrefix} from "../shared/api.constants";
import {OlympiadYearDTO} from "../olympiad-year/olympiad-year.dto";
import {OlympiadRoundService} from "./olympiad-round.service";
import {OlympiadRoundDTO, OlympiadRoundRO} from "./olympiad-round.dto";
import {TestService} from "../test/test.service";
import {ContestantService} from "../contestant/contestant.service";
import {ApiOkResponse} from "@nestjs/swagger";
import {GuaranteeRO} from "../guarantee/guarantee.dto";
import {TestRO} from "../test/test.dto";
import {ContestantRO} from "../contestant/contestant.dto";

@Controller(apiPrefix + 'olympiadrounds')
export class OlympiadRoundController {
    constructor(private service: OlympiadRoundService,
                private testService: TestService,
                private contestantsService: ContestantService) {
    }


    // @Get()
    // // @Render('main')
    // getAllRounds(){
    //     const posts = this.service.getAll();
    //     return posts;
    // }

    @ApiOkResponse({type: [OlympiadRoundRO]})
    @Get(':id')
    getRoundById(
        @Param('id', ParseIntPipe) id
    ) {
        const result = this.service.getById(id, ['previousRound', 'nextRound']);
        return result;
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateRound(
        @Param('id', ParseIntPipe) id,
        @Body() olympiadRoundDTO: OlympiadRoundDTO
    ) {
        olympiadRoundDTO.id = id;
        const result = this.service.update(olympiadRoundDTO);
        return result;
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteRound(
        @Param('id', ParseIntPipe) id,
    ) {
        const result = this.service.delete(id);
        return result;
    }

    //TESTS
    @ApiOkResponse({type: [TestRO]})
    @Get(':id/tests')
    @UsePipes(ValidationPipe)
    getAllTestsInRound(
        @Param('id', ParseIntPipe) id,
    ) {
        const result = this.testService.getByOlympiadRoundId(id);
        return result;
    }


    //CONTESTANTS
    @ApiOkResponse({type: [ContestantRO]})
    @Get(':id/contestants')
    @UsePipes(ValidationPipe)
    getAllContestantsInRound(
        @Param('id', ParseIntPipe) id,
    ){
        return this.contestantsService.getAllByOlympiadRoundId(id);
    }
}
