import {Body, Controller, Delete, Get, Param, Put, UsePipes} from '@nestjs/common';
import {RegionService} from "../region/region.service";
import {DistrictService} from "../district/district.service";
import {ContactPersonService} from "./contact-person.service";
import {apiPrefix} from "../shared/api.constants";
import {ValidationPipe} from "../shared/validation.pipe";
import {ContactPersonDTO, ContactPersonRO} from "./contact-person.dto";
import {allRelations} from "./contact-person.constants";
import {ApiOkResponse} from "@nestjs/swagger";

@Controller(apiPrefix + 'contactpersons')
export class ContactPersonController {
    constructor(private service: ContactPersonService){}

    @ApiOkResponse({type: ContactPersonRO})
    @Get()
    // @Render('main')
    getAllPersons(){
        const posts = this.service.getAll(allRelations);
        return posts;
    }

    @ApiOkResponse({type: ContactPersonRO})
    @Get(':id')
    getPersonById(
        @Param('id') id
    ){
        const result = this.service.getById(id, allRelations);
        return result;
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateContactPerson(
        @Param('id') id: number,
        @Body() contactPersonDTO: ContactPersonDTO
    ){
        contactPersonDTO.id = id;
        const result = this.service.update(contactPersonDTO);
        return result;
    }

    @Delete(':id')
    @UsePipes(ValidationPipe)
    deleteContactPerson(
        @Param('id') id
    ){
        const result = this.service.delete(id);
        return result;
    }

}
