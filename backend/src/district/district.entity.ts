
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany} from 'typeorm';
import {RegionEntity} from "../region/region.entity";
import {SchoolEntity} from "../school/school.entity";
import {BaseEntity} from "../shared/base-entity";
import {DistrictRO} from "./district.dto";
import {ContactPersonEntity} from "../contact-person/contact-person.entity";
import {GuaranteeEntity} from "../guarantee/guarantee.entity";
import {ROargs} from "../shared/base-ro";

@Entity('district')
export class DistrictEntity extends BaseEntity<DistrictRO>{
  @Column()
  name: string;

  @ManyToOne(type => RegionEntity, region => region.districts)
  region: RegionEntity;

  @OneToMany(type => SchoolEntity, school => school.district, {
    cascade: true,
    // eager: true
  })
  schools: SchoolEntity[];

  @ManyToOne(type => ContactPersonEntity, contactPerson => contactPerson.districts,
      {onDelete: "SET NULL"})
  contactPerson: ContactPersonEntity;

  @ManyToMany(type => GuaranteeEntity, guarantee => guarantee.districts)
  guarantees: GuaranteeEntity[];



  toResponseObject(args?: ROargs): DistrictRO {
    const {id, name} = this;
    const responseObject: DistrictRO = {
      id, name
    }

    if(this.region != undefined){
      const region = this.region.toResponseObject();
      responseObject.region = region;
    }

    if(this.schools != undefined){
      const schools = this.schools.map(school => school.toResponseObject());
      responseObject.schools = schools;
    }

    if(this.contactPerson!= undefined){
      const contactPerson = this.contactPerson.toResponseObject();
      responseObject.contactPerson = contactPerson;
    }

    return responseObject;
  }

}
