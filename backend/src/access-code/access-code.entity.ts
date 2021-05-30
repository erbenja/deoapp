import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    BeforeInsert,
    AfterInsert,
    Generated
} from 'typeorm';
import {BaseEntity} from "../shared/base-entity";
import {AccessCodeRO} from "./access-code.dto";
import {ContestantEntity} from "../contestant/contestant.entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {AnsweredQuestionEntity} from "../answered-question/answered-question.entity";
import {ContestantRO} from "../contestant/contestant.dto";
import {ROargs} from "../shared/base-ro";

@Entity('accessCode')
export class AccessCodeEntity extends BaseEntity<AccessCodeRO> {
    // @PrimaryGeneratedColumn()
    // id: number;

  @Column({
    unique: true,
    // nullable: true,
  })
  code: string;

    @Column({type: "timestamp with time zone", default: null})
    activated: Date;

    @Column({type: "timestamp with time zone", nullable: true, default: null})
    testStart: Date;

    @Column({type: "timestamp with time zone", nullable: true, default: null})
    evaluated: Date;

    @ManyToOne(type => ContestantEntity, contestant => contestant.accessCodes, {
        eager: true,
        onDelete: "SET NULL"
    })
    contestant: ContestantEntity;

    @ManyToOne(type => OlympiadRoundEntity, round => round.accessCodes)
    round: OlympiadRoundEntity;

    @OneToMany(type => AnsweredQuestionEntity, answeredQuestion => answeredQuestion.accessCode)
    answeredQuestions: AnsweredQuestionEntity[];

    @BeforeInsert()
    generateCode() {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.code = result;
    }

    toResponseObject(args?: ROargs): AccessCodeRO {
        const {id, code, activated, testStart, evaluated} = this;
        const responseObject: AccessCodeRO = {
            id,
            code,
            activated,
            testStart,
            evaluated
        }

        if (this.contestant != undefined) {
            const contestant = this.contestant;
            responseObject.contestant = contestant.toResponseObject(args);
        }

        if (this.round != undefined) {
            const round = this.round;
            responseObject.round = round.toResponseObject(args);
        }

        if (this.answeredQuestions != undefined) {
            const answeredQuestions = this.answeredQuestions;
            responseObject.answeredQuestions = answeredQuestions.map(code => code.toResponseObject(args));
        }

        return responseObject;
    }

}
