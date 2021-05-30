
import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn} from 'typeorm';
import {EvaluatedQuestionRO} from "./evaluated-question.dto";
import {BaseEntity} from "../shared/base-entity";
import {AccountEntity} from "../account/account.entity";
import {AnsweredQuestionEntity} from "../answered-question/answered-question.entity";
import {AnsweredQuestionRO} from "../answered-question/answered-question.dto";
import {ROargs} from "../shared/base-ro";


@Entity('evaluatedQuestion')
export class EvaluatedQuestionEntity extends BaseEntity<EvaluatedQuestionRO>{
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column({default: 0})
  points: number;

  @Column({nullable: true})
  note: string;

  @Column({default: false})
  closed: boolean;

  @Column({type: "timestamp with time zone"})
  created: Date;

  @Column({type: "timestamp with time zone"})
  lastModified: Date;

  @ManyToOne(type => AccountEntity, account => account.evaluations, {
    eager: true
  })
  evaluator: AccountEntity;

  @OneToOne(type => AnsweredQuestionEntity, answeredQuestion => answeredQuestion.evaluation)
  @JoinColumn()
  answeredQuestion: AnsweredQuestionEntity;

  toResponseObject(args?: ROargs): EvaluatedQuestionRO {
    const {id, points, note, closed, created, lastModified} = this;
    const responseObject: EvaluatedQuestionRO = {
      id,
      points,
      note,
      closed,
      lastModified,
      created
    }

    if(this.evaluator != undefined){
      const evaluator = this.evaluator;
      responseObject.evaluator = evaluator.toResponseObject();
    }

    if(this.answeredQuestion != undefined){
      const answeredQuestion = this.answeredQuestion;
      responseObject.answeredQuestion = answeredQuestion.toResponseObject();
    }

    return responseObject;
  }

}
