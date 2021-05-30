import {IsNotEmpty, IsString} from 'class-validator';
import {PostTagDTO, PostTagRO} from "../post-tag/post-tag.dto";
import {AccountDTO} from "../account/account.dto";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {ApiResponseProperty} from "@nestjs/swagger";

export class PostDTO{
    id: number;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiModelProperty()
    content: string;

    lastModified?: Date;

    tags: PostTagDTO[];

    authorId: number;

    active: number;
}

export class PostRO {
    @ApiResponseProperty()
    id: number;
    @ApiResponseProperty()
    title: string;
    @ApiResponseProperty()
    content: string;
    @ApiResponseProperty()
    lastModified: Date;
    @ApiResponseProperty()
    created: Date;
    tags?: PostTagRO[];
    author?: AccountDTO;
    active: number;
}
