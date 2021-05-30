import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany} from 'typeorm';
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {RoundTypeRO} from "./round-type.dto";
import {BaseEntity} from "../shared/base-entity";
import {GuaranteeEntity} from "../guarantee/guarantee.entity";
import {ROargs} from "../shared/base-ro";

@Entity('roundType')
export class RoundTypeEntity extends BaseEntity<RoundTypeRO>{
    // @PrimaryGeneratedColumn()
    // id: number;

    @Column()
    name: string;

    @OneToMany(type => OlympiadRoundEntity, olympiadRound => olympiadRound.type)
    olympiadRounds: OlympiadRoundEntity[];

    @ManyToMany(type => GuaranteeEntity, guarantee => guarantee.roundTypes)
    guarantees: GuaranteeEntity[];

    toResponseObject(args?: ROargs): RoundTypeRO {
        const {id, name} = this;

        const responseObject: RoundTypeRO = {
            id,
            name
        }

        return responseObject;
    }

}
