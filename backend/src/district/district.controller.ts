import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {DistrictService}from "../district/district.service";
import {DistrictDTO, DistrictRO} from "../district/district.dto";
import {apiPrefix} from "../shared/api.constants";
import {SchoolService} from "../school/school.service";
import {SchoolDTO, SchoolRO} from "../school/school.dto";
import {ContactPersonService} from "../contact-person/contact-person.service";
import {ContactPersonDTO, ContactPersonRO} from "../contact-person/contact-person.dto";
import {IsNumber} from "class-validator";
import {ApiOkResponse} from "@nestjs/swagger";
import {ContestantRO} from "../contestant/contestant.dto";

@Controller(apiPrefix + 'districts')
export class DistrictController {
    constructor(private service: DistrictService,
                private schoolService: SchoolService,
                private contactPersonService: ContactPersonService){}

    @ApiOkResponse({type: DistrictRO})
    @Get()
    getAllDistricts(){
        const posts = this.service.getAll();
        return posts;
    }

    @ApiOkResponse({type: DistrictRO})
    @Get(':id')
    // @UsePipes(ValidationPipe)
    getDistrictById(
        @Param('id') id: number
    ){
        // return id;
        const result = this.service.getById(id);
        return result;
    }

    @ApiOkResponse({type: DistrictRO})
    @Put(':id')
    @UsePipes(ValidationPipe)
    updateDistrict(
        @Param('id') id: number,
        @Body() districtDTO: DistrictDTO
    ){
        districtDTO.id = id;
        const result = this.service.update(districtDTO);
        return result;
    }
    //
    // @Delete(':id')
    // @UsePipes(ValidationPipe)
    // deleteDistrict(
    //     @Param('id') id
    // ){
    //     const result = this.service.delete(id);
    //     return result;
    // }

    //SCHOOL IN DISTRICT
    @Post(':id/schools')
    @UsePipes(ValidationPipe)
    createSchool(
        @Param('id') id: number,
        @Body() schoolDTO: SchoolDTO
    ) {
        schoolDTO.districtId = id;
        const result = this.schoolService.create(schoolDTO);
        return result;
    }

    //CONTACT PERSON
    @ApiOkResponse({type: [ContactPersonRO]})
    @Get(':id/contactpersons')
    @UsePipes(ValidationPipe)
    getContactPerson(
        @Param('id') id: number,
    ) {
        const result = this.contactPersonService.getByDistrictId(id);
        return result;
    }

    @Post(':id/contactpersons')
    @UsePipes(ValidationPipe)
    createNewContactPerson(
        @Param('id') id: number,
        @Body() contactPersonDTO: ContactPersonDTO
    ) {
        if(contactPersonDTO.districtIds == undefined) {
            contactPersonDTO.districtIds = [];
        }

        contactPersonDTO.districtIds.push(id);
        const result = this.contactPersonService.create(contactPersonDTO);
        return result;
    }

}
