
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
    OneToOne,
    JoinColumn
} from 'typeorm';
import {GuaranteeRO} from "./guarantee.dto";
import {BaseEntity} from "../shared/base-entity";
import {AccountEntity} from "../account/account.entity";
import {RegionEntity} from "../region/region.entity";
import {DistrictEntity} from "../district/district.entity";
import {SchoolEntity} from "../school/school.entity";
import {RoundTypeEntity} from "../round-type/round-type.entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {ROargs} from "../shared/base-ro";

@Entity('guarantee')
export class GuaranteeEntity extends BaseEntity<GuaranteeRO>{
  // @PrimaryGeneratedColumn()
  // id: number;

  @OneToOne(type => AccountEntity)
  @JoinColumn()
  account: AccountEntity;

  @ManyToMany(type => RegionEntity, region => region.guarantees, {
      // eager: true
  })
  @JoinTable()
  regions: RegionEntity[];

  @ManyToMany(type => DistrictEntity, district => district.guarantees, {
      // eager: true
  })
  @JoinTable()
  districts: DistrictEntity[];

  @ManyToMany(type => SchoolEntity, school => school.guarantees, {
      // eager: true
  })
  @JoinTable()
  schools: SchoolEntity[];

  @ManyToMany(type => RoundTypeEntity, roundType => roundType.guarantees, {
      // eager: true
  })
  @JoinTable()
  roundTypes: RoundTypeEntity[];

  @ManyToMany(type => OlympiadRoundEntity, round => round.guarantees, {
      // eager: true
  })
  guaranteedRounds: OlympiadRoundEntity[];

  toResponseObject(args?: ROargs): GuaranteeRO {
    const {id} = this;
    const responseObject: GuaranteeRO = {
      id
    };
    //TODO - needs testing
    for(const [name] of Object.entries(this)){
      if(name != 'id'){
        if(this[name] != undefined){
          if(Array.isArray(this[name])){
            responseObject[name] = this[name].map(item => item.toResponseObject());
          } else {
            responseObject[name] = this[name].toResponseObject();
          }
        }
      }
    }


    return responseObject;
  }
}
