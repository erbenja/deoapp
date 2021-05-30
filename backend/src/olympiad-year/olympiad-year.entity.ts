import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, Unique, Index} from 'typeorm';
import {BaseEntity} from "../shared/base-entity";
import {OlympiadYearRO} from "./olympiad-year.dto";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {ROargs} from "../shared/base-ro";

@Entity('olympiadYear')
export class OlympiadYearEntity extends BaseEntity<OlympiadYearRO> {
    // @PrimaryGeneratedColumn()
    // id: number;

    @Column()
    name: string;

    @Column()
    //TODO unique year??
    // @Index({ unique: true })
    year: number;

    @Column()
    description: string;

    @Column({default: false})
    openToPublic: boolean;

    @Column({type: 'date'})
    registrationDeadline: Date;

    @OneToMany(type => OlympiadRoundEntity, round => round.year, {
        cascade: true,
        // eager: true
    })
    rounds: OlympiadRoundEntity[];

    toResponseObject(args?: ROargs): OlympiadYearRO {
        const {id, name, year, description, openToPublic, registrationDeadline} = this;
        const responseObject: OlympiadYearRO = {
            id,
            name,
            year,
            description,
            openToPublic,
            registrationDeadline,
        };

        // console.log("OLYMPIAD YEAR RO");
        // console.log(this.rounds);

        if (this.rounds != undefined) {
            const rounds = this.rounds.map(tag => tag.toResponseObject(args));
            responseObject.rounds = rounds;
        }

        return responseObject;
    }

}
