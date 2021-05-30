import {Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {DistrictService} from "../district/district.service";
import {RegionService} from "./region.service";
import {ContactPersonDTO, ContactPersonRO} from "../contact-person/contact-person.dto";
import {ContactPersonService} from "../contact-person/contact-person.service";
import {apiPrefix} from "../shared/api.constants";
import {RegionDTO, RegionRO} from "./region.dto";
import {ApiOkResponse} from "@nestjs/swagger";
import {DistrictRO} from "../district/district.dto";

@Controller(apiPrefix + 'regions')
export class RegionController {
    constructor(private service: RegionService,
                private districtService: DistrictService,
                private contactPersonService: ContactPersonService){}

    @ApiOkResponse({type: [RegionRO]})
    @Get()
    // @Render('main')
    getAllRegions(){
        const posts = this.service.getAll();
        return posts;
    }

    @ApiOkResponse({type: RegionRO})
    @Get(':id')
    getRegionById(
        @Param('id') id
    ){
        const result = this.service.getById(id);
        return result;
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateRegion(
        @Param('id') id: number,
        @Body() regionDTO: RegionDTO
    ){
        regionDTO.id = id;
        const result = this.service.update(regionDTO);
        return result;
    }

    // @Delete(':id')
    // @UsePipes(ValidationPipe)
    // deleteRegion(
    //     @Param('id') id
    // ){
    //     const result = this.service.delete(id);
    //     return result;
    // }

    //DISTRICTS
    @ApiOkResponse({type: [DistrictRO]})
    @Get(':id/districts')
    @UsePipes(ValidationPipe)
    getDistricts(
        @Param('id') id: number,
    ) {
        const result = this.districtService.getByRegionId(id);
        return result;
    }


    //CONTACT PERSON
    @ApiOkResponse({type: [ContactPersonRO]})
    @Get(':id/contactpersons')
    @UsePipes(ValidationPipe)
    getContactPerson(
        @Param('id') id: number,
    ) {
        const result = this.contactPersonService.getByRegionId(id);
        return result;
    }

    @Post(':id/contactpersons')
    @UsePipes(ValidationPipe)
    createNewContactPerson(
        @Param('id') id: number,
        @Body() contactPersonDTO: ContactPersonDTO
    ) {
        if(contactPersonDTO.regionIds == undefined) {
            contactPersonDTO.regionIds = [];
        }

        contactPersonDTO.regionIds.push(id);
        const result = this.contactPersonService.create(contactPersonDTO);
        return result;
    }

}
