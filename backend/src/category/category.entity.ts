import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable, JoinColumn} from 'typeorm';
import {TestEntity} from "../test/test.entity";
import {CategoryRO} from "./category.dto";
import {BaseEntity} from "../shared/base-entity";
import {ROargs} from "../shared/base-ro";

@Entity('category')
export class CategoryEntity extends BaseEntity<CategoryRO> {
    @Column()
    name: string;

    @Column()
    classMin: number;

    @Column()
    classMax: number;

    @OneToMany(type => TestEntity, test => test.category, {
        cascade: true,
        // eager: tru
    })
    tests: TestEntity[];

    toResponseObject(args?: ROargs): CategoryRO {
        const {id, name, classMax, classMin} = this;
        const responseObject: CategoryRO = {
            id,
            name,
            classMax,
            classMin
        }

        if (this.tests != undefined) {
            const tests = this.tests.map(test => test.toResponseObject());
            responseObject.tests = tests;
        }

        return responseObject;

    }

}
