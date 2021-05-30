
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {QuestionRO} from "./question.dto";
import {BaseEntity} from "../shared/base-entity";
import {QuestionOptionEntity} from "../question-option/question-option.entity";
import {QuestionTypeEntity} from "../question-type/question-type.entity";
import {TestEntity} from "../test/test.entity";
import {canReportError} from "rxjs/internal/util/canReportError";
import {AnsweredQuestionEntity} from "../answered-question/answered-question.entity";
import {ROargs} from "../shared/base-ro";

@Entity('question')
export class QuestionEntity extends BaseEntity<QuestionRO>{
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column()
  task: string;

  @Column()
  points: number;

  @Column()
  orderNum: number;

  @Column({nullable: true})
  img: string;

  @Column({type: "timestamp with time zone"})
  lastModified: Date;

  @Column({type: "timestamp with time zone"})
  created: Date;

  @OneToMany(type => QuestionOptionEntity, questionOption => questionOption.question, {
    eager: true,
    // cascade: true
  })
  options: QuestionOptionEntity[];

  @ManyToOne(type => QuestionTypeEntity, questionType => questionType.questions, {
    eager: true,
    // cascade: true
  })
  type: QuestionTypeEntity;

  @OneToMany(type => AnsweredQuestionEntity, answeredQuestion => answeredQuestion.question)
  answeredQuestions: AnsweredQuestionEntity[];

  @ManyToOne(type => TestEntity, test => test.questions)
  test: TestEntity;

  toResponseObject(args?: ROargs): QuestionRO {
    const {id, task, points, orderNum, lastModified, created, img} = this;
    const responseObject: QuestionRO = {
      id,
      task,
      points,
      orderNum,
      lastModified,
      created,
      img,
    }

    if(this.options != undefined){
      const options = this.options;
      responseObject.options = options.map(option => option.toResponseObject(args));
    }

    if(this.type != undefined){
      const type = this.type;
      responseObject.type = type.toResponseObject(args);
    }

    if(this.test != undefined && args.testNoQuestions){
      const test = this.test;
      responseObject.test = test.toResponseObject(args);
    }

    return responseObject;
  }

}
