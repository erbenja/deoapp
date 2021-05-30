import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UsePipes} from '@nestjs/common';
import {CategoryService} from "./category.service";
import {ValidationPipe} from "../shared/validation.pipe";
import {CategoryDTO, CategoryRO} from "./category.dto";
import {apiPrefix} from "../shared/api.constants";
import {ApiOkResponse} from "@nestjs/swagger";

@Controller(apiPrefix + 'categories')
export class CategoryController {
    constructor(private service: CategoryService){}

    @ApiOkResponse({type: CategoryRO})
    @Get()
    // @Render('main')
    getAllCategories(){
        const posts = this.service.getAll();
        return posts;
    }

    @ApiOkResponse({type: CategoryRO})
    @Get(':id')
    getCategoryById(
        @Param('id', ParseIntPipe) id,
    ) {
        const result = this.service.getById(id);
        return result;
    }

    @Post()
    @UsePipes(ValidationPipe)
    createCategory(
        @Body() categoryDTO: CategoryDTO
    ) {
        const result = this.service.create(categoryDTO);
        return result;
    }

    @Put(':id')
    @UsePipes(ValidationPipe)
    updateCategory(
        @Param('id', ParseIntPipe) id,
        @Body() categoryDTO: CategoryDTO
    ) {
        categoryDTO.id = id;
        const result = this.service.update(categoryDTO);
        return result;
    }

    // @Delete(':id')
    // @UsePipes(ValidationPipe)
    // deleteCategory(
    //     @Param('id') id
    // ) {
    //     const result = this.service.delete(id);
    //     return result;
    // }
}
