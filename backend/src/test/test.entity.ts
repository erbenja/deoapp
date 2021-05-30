
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import {BaseEntity} from "../shared/base-entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {TestRO} from "./test.dto";
import {CategoryEntity} from "../category/category.entity";
import {QuestionEntity} from "../question/question.entity";
import {ROargs} from "../shared/base-ro";


@Entity('test')
export class TestEntity extends BaseEntity<TestRO>{
  // @PrimaryGeneratedColumn()
  // id: number;

  @Column()
  timeLimit: number;

  @Column({default: false})
  closed: boolean;

  @Column({type: "timestamp with time zone", nullable: true})
  lastModified: Date;

  @Column({type: "timestamp with time zone", nullable: true})
  created: Date;

  @ManyToOne(type => OlympiadRoundEntity, round => round.tests, {
    onDelete: "SET NULL",
  })
  round: OlympiadRoundEntity;

  @ManyToOne(type => CategoryEntity, category => category.tests, {
    eager: true
  })
  category: CategoryEntity;

  // TODO
  @OneToMany(type => QuestionEntity, question => question.test,{
    eager: true
  })
  questions: QuestionEntity[]



  toResponseObject(args?: ROargs): TestRO {
    const {id, timeLimit, closed, lastModified, created} = this;
    const responseObject: TestRO = {
      id,
      timeLimit,
      closed,
      lastModified,
      created,
    }

    if(this.round != undefined){
      const round = this.round;
      responseObject.round = round.toResponseObject(args);
    }

    if(this.category != undefined){
      const category = this.category;
      responseObject.category = category.toResponseObject(args);
    }

    if(this.questions != undefined && !args.testNoQuestions){
      const questions = this.questions;
      responseObject.questions = questions.map(question => question.toResponseObject(args));
    }

    return responseObject;
  }

}
