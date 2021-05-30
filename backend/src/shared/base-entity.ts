import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {PostRO} from "../post/post.dto";
import {ROargs} from "./base-ro";


// @Entity()
export abstract class BaseEntity<RO> {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({default: 1})
    // active: number;

    //TODO
    //define interface what to expands => how deep should this function go in nested objects
    abstract toResponseObject(args?: ROargs): RO;
}
