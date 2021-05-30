import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {getManager, Repository, Timestamp} from 'typeorm';
import {PostEntity} from './post.entity';
import {PostDTO, PostRO} from './post.dto';
import {RandomGenerator} from "typeorm/util/RandomGenerator";
import {BaseService} from "../shared/base-service";
import {merge} from "rxjs";
import {AccountEntity} from "../account/account.entity";

@Injectable()
export class PostService extends BaseService<PostEntity, PostRO, PostDTO> {
    constructor(@InjectRepository(PostEntity) private postsRepository: Repository<PostEntity>,
                @InjectRepository(AccountEntity) private accountsRepository: Repository<AccountEntity>) {
        super(postsRepository);
    }

    async create(createPostDTO: PostDTO) {
        const post = this.postsRepository.create();

        post.title = createPostDTO.title;
        post.content = createPostDTO.content;
        post.created = new Date();
        post.lastModified = new Date();

        const foundUser = await this.accountsRepository.findOne({where: {id: createPostDTO.authorId}});
        // console.log(createPostDTO);
        if (foundUser != undefined) {
            post.author = foundUser;
        }

        //TODO -- post tags

        const result = await this.postsRepository.save(post);

        return {status: 0, ...result};
    }

    async update(updatePostDTO: PostDTO) {
        const toBeUpdated = await this.postsRepository.findOne(updatePostDTO.id);

        // return {
        //     status: -1,
        //     msg: "The email has already been taken.",
        // }

        if (toBeUpdated != undefined) {
            updatePostDTO.lastModified = new Date();

            const merged = await this.postsRepository.merge(toBeUpdated, updatePostDTO);
            await this.postsRepository.update(merged.id, merged);

            const result = await this.postsRepository.findOne({where: {id: merged.id}, relations: ['author']});

            return {status: 0, msg: 'good job', ...result};
        } else {
            throw new HttpException(
                `Post with id: ${updatePostDTO.id} doesnt exist`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

    }

}
