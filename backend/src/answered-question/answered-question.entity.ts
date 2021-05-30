
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, Unique} from 'typeorm';
import {AnsweredQuestionRO} from "./answered-question.dto";
import {BaseEntity} from "../shared/base-entity";
import {QuestionEntity} from "../question/question.entity";
import {QuestionRO} from "../question/question.dto";
import {EvaluatedQuestionEntity} from "../evaluated-question/evaluated-question.entity";
import {AccessCodeEntity} from "../access-code/access-code.entity";
import {ROargs} from "../shared/base-ro";

@Entity('answeredQuestion')
export class AnsweredQuestionEntity extends BaseEntity<AnsweredQuestionRO>{
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({type: "json"})
  answer: any;

  @Column({type: "timestamp with time zone"})
  lastModified: Date;

  @Column({type: "timestamp with time zone"})
  created: Date;

  @ManyToOne(type => AccessCodeEntity, accessCode => accessCode.answeredQuestions)
  accessCode: AccessCodeEntity;

  @ManyToOne(type => QuestionEntity, question => question.answeredQuestions)
  question: QuestionEntity;

  @OneToOne(type => EvaluatedQuestionEntity, evaluatedQuestion => evaluatedQuestion.answeredQuestion, {
    // eager: true,
  })
  evaluation: EvaluatedQuestionEntity;

  toResponseObject(args?: ROargs): AnsweredQuestionRO {
    const {id, answer, lastModified, created} = this;
    const responseObject: AnsweredQuestionRO = {
      id,
      answer,
      lastModified,
      created
    }

    if(this.accessCode != undefined){
      const accessCode = this.accessCode;
      responseObject.accessCode = accessCode.toResponseObject(args);
    }

    if(this.question != undefined){
      const question = this.question;
      responseObject.question = question.toResponseObject(args);
    }

    if(this.evaluation != undefined){
      const evaluation = this.evaluation;
      responseObject.evaluation = evaluation.toResponseObject(args);
    }

    return responseObject;
  }

}
