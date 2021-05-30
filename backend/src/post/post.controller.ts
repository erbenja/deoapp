import {
    Body,
    Controller, createParamDecorator,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put, SetMetadata, UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import {PostService} from './post.service';
import {PostDTO, PostRO} from './post.dto';
import {apiPrefix} from "../shared/api.constants";
import {RolesGuard} from "../auth/roles.guard";
import {JwtAccessAuthGuard} from "../auth/jwt-access-auth.guard";
import {JwtRefreshAuthGuard} from "../auth/unused/jwt-refresh-auth.guard";
import {userInfo} from "os";
import {AuthCodeId, AuthGuaranteeId, AuthUserId} from "../auth/auth.dto";
import {hash} from "typeorm/util/StringUtils";
import {ExampleService} from "../mail/mail.service";
import {ContestantsGuard} from "../auth/contestants.guard";
import {FileInterceptor} from "@nestjs/platform-express";
import {editFileName, imageFileFilter} from "../file-upload.utils";
import {diskStorage} from 'multer';
import {ApiOkResponse} from "@nestjs/swagger";
import {OlympiadYearRO} from "../olympiad-year/olympiad-year.dto";


@Controller(apiPrefix + 'posts')
export class PostController {
    constructor(private service: PostService) {
    }

    @ApiOkResponse({type: [PostRO]})
    @Get()
    getAllPosts() {
        const posts = this.service.getAll(['author']);
        return posts;
    }


    @ApiOkResponse({type: PostRO})
    @Get(':id')
    getPostById(
        @Param('id', ParseIntPipe) id,
    ) {
        const result = this.service.getById(id, ['author']);
        return result;
    }


    @Post()
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', [ 'admin'])
    @UsePipes(ValidationPipe)
    createPost(
        @Body() postDTO: PostDTO,
        @AuthUserId() userId
    ) {
        postDTO.authorId = userId;
        const result = this.service.create(postDTO);
        return result;
    }


    @Put(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', [ 'admin'])
    //commented to enable partial update
    // @UsePipes(ValidationPipe)
    updatePost(
        @Param('id', ParseIntPipe) id,
        @Body() postDTO: PostDTO,
        @AuthUserId() userId
    ) {
        postDTO.id = id;
        postDTO.authorId = userId;
        const result = this.service.update(postDTO);
        return result;
    }

    @Delete(':id')
    @UseGuards(JwtAccessAuthGuard, RolesGuard)
    @SetMetadata('roles', [ 'admin'])
    @UsePipes(ValidationPipe)
    deletePost(
        @Param('id') id
    ) {
        const result = this.service.delete(id);
        return result;
    }

}
