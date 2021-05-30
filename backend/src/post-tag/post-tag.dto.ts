import {IsNotEmpty, IsString} from 'class-validator';

export class PostTagDTO {
    id: number;

    @IsNotEmpty()
    @IsString()
    name: string;
}

export class PostTagRO {
    id: number;
    name: string;
}
