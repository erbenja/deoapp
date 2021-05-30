
import {IsEmail, IsPhoneNumber, IsString} from "class-validator";
import {BaseEntity} from "../shared/base-entity";
import {Column, Entity, OneToMany} from "typeorm";
import {RegionEntity} from "../region/region.entity";
import {DistrictEntity} from "../district/district.entity";
import {SchoolEntity} from "../school/school.entity";
import {ContactPersonRO} from "./contact-person.dto";
import {DistrictRO} from "../district/district.dto";
import {ROargs} from "../shared/base-ro";


@Entity('contactPerson')
export class ContactPersonEntity extends BaseEntity<ContactPersonRO> {
    //CONTACT PERSON INFO
    @Column()
    @IsString()
    firstname: string;

    @Column()
    @IsString()
    surname: string;

    @Column()
    // @IsPhoneNumber('CZ')
    phone: string;

    @Column()
    @IsEmail()
    email: string;

    @OneToMany(type => RegionEntity, region => region.contactPerson, {
        cascade: true,
        // eager: true
    })
    regions: RegionEntity[];

    @OneToMany(type => DistrictEntity, district => district.contactPerson, {
        cascade: true,
        // eager: true
    })
    districts: DistrictEntity[];

    @OneToMany(type => SchoolEntity, school => school.contactPerson, {
        cascade: true,
        // eager: true
    })
    schools: SchoolEntity[];



    toResponseObject(args?: ROargs): ContactPersonRO {
        const {id, firstname, surname, phone, email} = this;
        const responseObject: ContactPersonRO = {
            id, firstname, surname, phone, email
        }

        if(this.regions != undefined){
            const regions = this.regions.map(school => school.toResponseObject());
            responseObject.regions = regions;
        }

        if(this.schools != undefined){
            const schools = this.schools.map(school => school.toResponseObject());
            responseObject.schools = schools;
        }

        if(this.districts!= undefined){
            const districts = this.districts.map(school => school.toResponseObject());
            responseObject.districts = districts;
        }

        return responseObject;
    }

}
