import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from 'typeorm';
import {PostEntity} from "../post/post.entity";
import {BaseEntity} from "../shared/base-entity";
import {PostTagRO} from "./post-tag.dto";
import {ROargs} from "../shared/base-ro";

@Entity('postTag')
export class PostTagEntity extends BaseEntity<PostTagRO> {
    @Column()
    name: string;

    @ManyToMany(type => PostEntity, post => post.tags)
    posts: PostEntity[];

    toResponseObject(args?: ROargs): PostTagRO {
        const {id, name} = this;

        const responseObject: PostTagRO = {
            id,
            name
        }

        return responseObject;
    }

}
