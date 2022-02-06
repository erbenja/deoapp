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
import {RoundTypeEntity} from "../round-type/round-type.entity";
import {OlympiadYearEntity} from "../olympiad-year/olympiad-year.entity";
import {OlympiadRoundRO} from "./olympiad-round.dto";
import {BaseEntity} from "../shared/base-entity";
import {OlympiadYearRO} from "../olympiad-year/olympiad-year.dto";
import {TestEntity} from "../test/test.entity";
import {AccessCodeEntity} from "../access-code/access-code.entity";
import {GuaranteeEntity} from "../guarantee/guarantee.entity";
import {ROargs} from "../shared/base-ro";


@Entity('olympiadRound')
export class OlympiadRoundEntity extends BaseEntity<OlympiadRoundRO> {
    // @PrimaryGeneratedColumn()
    // id: number;

    @Column({type: 'date'})
    roundStart: Date;

    @Column({type: 'date'})
    roundEnd: Date;

    @OneToOne(type => OlympiadRoundEntity, round => round.previousRound, {
        cascade: null,
    })
    @JoinColumn()
    nextRound: OlympiadRoundEntity;

    @OneToOne(type => OlympiadRoundEntity, round => round.nextRound)
    @JoinColumn()
    previousRound: OlympiadRoundEntity;

    @ManyToOne(type => RoundTypeEntity, roundType => roundType.olympiadRounds, {
        cascade: true,
        eager: true
    })
    type: RoundTypeEntity;

    @ManyToOne(type => OlympiadYearEntity, year => year.rounds, {
        onDelete: "SET NULL",
    })
    year: OlympiadYearEntity;

    @OneToMany(type => TestEntity, test => test.round, {
        cascade: true,
        // eager: true
    })
    tests: TestEntity[];

    @OneToMany(type => AccessCodeEntity, accessCode => accessCode.round)
    accessCodes: AccessCodeEntity[];

    @ManyToMany(type => GuaranteeEntity, guarantee => guarantee.guaranteedRounds, {
        cascade: true
    })
    @JoinTable()
    guarantees: GuaranteeEntity[];

    toResponseObject(args?: ROargs): OlympiadRoundRO {
        const {id, roundStart, roundEnd} = this;
        const responseObject: OlympiadRoundRO = {
            id,
            roundStart,
            roundEnd
        };

        // console.log(this.year);

        //TODO
        //REFERENCES most likely wia mapping, raw insert in DB doesnt count and isnt propagated in ORM
        if (this.nextRound != undefined) {
            const rounds = this.nextRound;
            responseObject.nextRound = rounds.toResponseObject();
        }

        if (this.previousRound != undefined) {
            const rounds = this.previousRound;
            responseObject.previousRound = rounds.toResponseObject();
        }

        if (this.type != undefined) {
            const type = this.type;
            responseObject.type = type.toResponseObject();
        }

        if (this.year != undefined) {
            const year = this.year;
            responseObject.year = year.toResponseObject();
        }

        if (this.tests != undefined) {
            const tests = this.tests;
            responseObject.tests = tests.map(test => test.toResponseObject());
        }

        return responseObject;
    }

}
