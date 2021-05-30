import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany} from 'typeorm';
import {PostRO} from './post.dto';
import {BaseEntity} from "../shared/base-entity";
import {PostTagEntity} from "../post-tag/post-tag.entity";
import {AccountEntity} from "../account/account.entity";
import {ROargs} from "../shared/base-ro";
// import { AccountEntity } from './account.entity';
// import { PostTagEntity } from './postTag.entity';


@Entity('post')
export class PostEntity extends BaseEntity<PostRO> {
    @Column()
    title: string;

    @Column({nullable: true})
    content: string;

    @Column({nullable: true, default: 0})
    active: number;

    @Column({type: "timestamp with time zone", nullable: true})
    lastModified: Date;

    @Column({type: "timestamp with time zone", nullable: true})
    created: Date;

    @ManyToMany(type => PostTagEntity, tag => tag.posts)
    tags: PostTagEntity[];

    @ManyToOne(type => AccountEntity)
    author: AccountEntity;

    // toResponseObject(showToken: boolean = true): PostRO {

    toResponseObject(args?: ROargs): PostRO {
        const {id, created, lastModified, title, content, author, active} = this;
        const responseObject: PostRO = {
            id,
            created,
            lastModified,
            title,
            content,
            author,
            active
        };

        if (this.tags != undefined) {
            const tags = this.tags.map(tag => tag.toResponseObject());
            responseObject.tags = tags;
        }
        return responseObject;
    }

}
