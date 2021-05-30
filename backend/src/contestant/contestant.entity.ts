
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {SchoolEntity} from "../school/school.entity";
import {ContestantRO} from "./contestant.dto";
import {BaseEntity} from "../shared/base-entity";
import {AnsweredQuestionRO} from "../answered-question/answered-question.dto";
import {AccessCodeEntity} from "../access-code/access-code.entity";
import {ROargs} from "../shared/base-ro";

@Entity('contestant')
export class ContestantEntity extends BaseEntity<ContestantRO>{
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column()
  firstname: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column("date")
  birthdate: Date;

  @Column()
  classNum: number;

  @ManyToOne(type => SchoolEntity, school => school.contestants)
  school: SchoolEntity;

  @OneToMany(type => AccessCodeEntity, accessCode => accessCode.contestant)
  accessCodes: AccessCodeEntity[];


  toResponseObject(args?: ROargs): ContestantRO {
    const {id, firstname, surname, email, birthdate, classNum} = this;
    const responseObject: ContestantRO = {
      id,
      firstname,
      surname,
      email,
      birthdate,
      classNum
    }

    if(this.accessCodes != undefined){
      const accessCodes = this.accessCodes;
      responseObject.accessCodes = accessCodes.map(code => code.toResponseObject());
    }

    if(this.school != undefined){
      const school = this.school;
      responseObject.school = school.toResponseObject();
    }

    return responseObject;
  }
}
