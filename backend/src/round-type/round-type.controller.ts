import {Controller, Get, Param} from '@nestjs/common';
import {apiPrefix} from "../shared/api.constants";
import {RoundTypeService} from "./round-type.service";
import {ApiOkResponse} from "@nestjs/swagger";
import {DistrictRO} from "../district/district.dto";
import {PostRO} from "../post/post.dto";

@Controller(apiPrefix + 'roundtypes')
export class RoundTypeController {

    constructor(private service: RoundTypeService){}

    @ApiOkResponse({type: PostRO})
    @Get(':id')
    getPostTagById(
        @Param('id') id
    ){
        return this.service.getById(id);
    }

    @ApiOkResponse({type: [PostRO]})
    @Get()
    getAllPosts(){
        return this.service.getAll();
    }

}
