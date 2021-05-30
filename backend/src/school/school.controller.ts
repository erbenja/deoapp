import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {SchoolService} from "./school.service";
import {PostDTO, PostRO} from "../post/post.dto";
import {apiPrefix} from "../shared/api.constants";
import {SchoolDTO, SchoolRO} from "./school.dto";
import {ContactPersonDTO, ContactPersonRO} from "../contact-person/contact-person.dto";
import {ContactPersonService} from "../contact-person/contact-person.service";
import {ApiOkResponse} from "@nestjs/swagger";

@Controller(apiPrefix + 'schools')
export class SchoolController {
    constructor(private service: SchoolService,
                private contactPersonService: ContactPersonService){}

    @ApiOkResponse({type: [SchoolRO]})
    @Get()
    // @Render('main')
    getAllSchools(){
        const posts = this.service.getAll(['contactPerson']);
        return posts;
    }

    @ApiOkResponse({type: SchoolRO})
    @Get(':id')
    getSchoolById(
        @Param('id') id
    ){
        const result = this.service.getById(id, ['contactPerson']);
        return result;
    }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createSchool(
    //     @Body() schoolDTO: SchoolDTO
    // ) {
    //     const result = this.service.create(schoolDTO);
    //     return result;
    // }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateSchool(
        @Param('id') id: number,
        @Body() schoolDTO: SchoolDTO
    ){
        schoolDTO.id = id;
        const result = this.service.update(schoolDTO);
        return result;
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteSchool(
        @Param('id') id
    ){
        const result = this.service.delete(id);
        return result;
    }

    //CONTACT PERSON
    @ApiOkResponse({type: [ContactPersonRO]})
    @Get(':id/contactpersons')
    @UsePipes(ValidationPipe)
    getContactPerson(
        @Param('id') id: number,
    ) {
        const result = this.contactPersonService.getBySchoolId(id);
        return result;
    }

    @Post(':id/contactpersons')
    @UsePipes(ValidationPipe)
    createNewContactPerson(
        @Param('id') id: number,
        @Body() contactPersonDTO: ContactPersonDTO
    ) {
        if(contactPersonDTO.schoolIds == undefined) {
            contactPersonDTO.schoolIds = [];
        }

        contactPersonDTO.schoolIds.push(id);
        const result = this.contactPersonService.create(contactPersonDTO);
        return result;
    }

}
