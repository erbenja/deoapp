import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany} from 'typeorm';
import {DistrictEntity} from "../district/district.entity";
import {BaseEntity} from "../shared/base-entity";
import {SchoolRO} from "./school.dto";
import {ContactPersonEntity} from "../contact-person/contact-person.entity";
import {ContestantEntity} from "../contestant/contestant.entity";
import {GuaranteeEntity} from "../guarantee/guarantee.entity";
import {ROargs} from "../shared/base-ro";

@Entity('school')
export class SchoolEntity extends BaseEntity<SchoolRO> {
    @Column()
    name: string;

    @ManyToOne(type => DistrictEntity, district => district.schools)
    district: DistrictEntity;

    @ManyToOne(type => ContactPersonEntity, contactPerson => contactPerson.districts, {
        onDelete: "SET NULL",
        // eager: true
    })
    contactPerson: ContactPersonEntity;

    @ManyToMany(type => GuaranteeEntity, guarantee => guarantee.schools)
    guarantees: GuaranteeEntity[];



    toResponseObject(args?: ROargs): SchoolRO {
        const {id, name} = this;
        const responseObject: SchoolRO = {
            id, name
        }

        if (this.district != undefined) {
            const district = this.district.toResponseObject();
            responseObject.district = district;
        }

        if(this.contactPerson!= undefined){
            const contactPerson = this.contactPerson.toResponseObject();
            responseObject.contactPerson = contactPerson;
        }

        return responseObject;
    }

    @OneToMany(type => ContestantEntity, contestant => contestant.school)
    contestants: ContestantEntity[];

}
