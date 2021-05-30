
import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany, ManyToOne} from 'typeorm';
import {DistrictEntity} from "../district/district.entity";
import {BaseEntity} from "../shared/base-entity";
import {RegionRO} from "./region.dto";
import {DistrictRO} from "../district/district.dto";
import {ContactPersonEntity} from "../contact-person/contact-person.entity";
import {GuaranteeEntity} from "../guarantee/guarantee.entity";
import {ROargs} from "../shared/base-ro";

@Entity('region')
export class RegionEntity extends BaseEntity<RegionRO>{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(type => DistrictEntity, district => district.region, {
    cascade: true,
    // eager: true
  })
  districts: DistrictEntity[];

  @ManyToOne(type => ContactPersonEntity, contactPerson => contactPerson.districts,
      {onDelete: "SET NULL"})
  contactPerson: ContactPersonEntity;

  @ManyToMany(type => GuaranteeEntity, guarantee => guarantee.regions)
  guarantees: GuaranteeEntity[];



  toResponseObject(args?: ROargs): RegionRO {
    const {id, name} = this;
    const responseObject: RegionRO = {
      id, name
    }

    if(this.districts != undefined){
      const districts = this.districts.map(district => district.toResponseObject());
      responseObject.districts = districts;
    }

    if(this.contactPerson!= undefined){
      const contactPerson = this.contactPerson.toResponseObject();
      responseObject.contactPerson = contactPerson;
    }

    return responseObject;
  }
}
