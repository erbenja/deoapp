import {Controller, Get, Param} from '@nestjs/common';
import {apiPrefix} from "../shared/api.constants";
import {PostTagService} from "./post-tag.service";

@Controller(apiPrefix + 'posttags')
export class PostTagController {

    constructor(private service: PostTagService){}

    @Get(':id')
    getPostTagById(
        @Param('id') id
    ){
        return this.service.getById(id);
    }

    @Get()
    getAllPosts(){
        return this.service.getAll();
    }

}
