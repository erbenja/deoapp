
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import {QuestionEntity} from "../question/question.entity";
import {BaseEntity} from "../shared/base-entity";
import {QuestionTypeRO, questionTypes} from "./question-type.dto";
import {ROargs} from "../shared/base-ro";

@Entity('questionType')
export class QuestionTypeEntity extends BaseEntity<QuestionTypeRO> {
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({type: 'enum', enum: questionTypes})
  type: questionTypes;

  @Column({default: false})
  serverEvaluation: boolean;

  @OneToMany(type => QuestionEntity, question => question.type, {
    // eager: true,
    cascade: true
  })
  questions: QuestionEntity[];

  toResponseObject(args?: ROargs): QuestionTypeRO {
    const {id, type, serverEvaluation} = this;

    const responseObject: QuestionTypeRO = {
      id,
      type,
      serverEvaluation
    }

    return responseObject;
  }
}
