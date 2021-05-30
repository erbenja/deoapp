import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {OlympiadYearEntity} from "./olympiad-year.entity";
import {OlympiadYearDTO, OlympiadYearRO} from "./olympiad-year.dto";
import {BaseService} from "../shared/base-service";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {async} from "rxjs/internal/scheduler/async";

@Injectable()
export class OlympiadYearService extends BaseService<OlympiadYearEntity, OlympiadYearRO, OlympiadYearDTO> {

    constructor(@InjectRepository(OlympiadYearEntity) private yearsRepository: Repository<OlympiadYearEntity>,
                @InjectRepository(OlympiadRoundEntity) private roundsRepository: Repository<OlympiadRoundEntity>) {
        super(yearsRepository);
    }

    // async getById(id: number, relations: string[] = [], order: {} = {}): Promise<OlympiadYearEntity> {
    //     const item = await this.yearsRepository.findOne({where: {id: id}, relations, order});
    //
    //     console.log(item);
    //
    //     try {
    //         return item.toResponseObject();
    //     } catch (e) {
    //         throw new HttpException(`Item with id ${id} doesnt exists; ${e.toString()}`, HttpStatus.NO_CONTENT)
    //     }
    // }

    async create(createDTO: OlympiadYearDTO): Promise<OlympiadYearRO> {
        const {name, year, description, openToPublic, registrationDeadline} = createDTO;
        const newOlympiadYear = this.yearsRepository.create();
        newOlympiadYear.name = name;
        newOlympiadYear.year = year;
        newOlympiadYear.description = description;
        newOlympiadYear.openToPublic = openToPublic;
        newOlympiadYear.registrationDeadline = registrationDeadline;

        //TODO -- permissions

        await this.yearsRepository.save(newOlympiadYear);
        const result = await this.yearsRepository.findOne(newOlympiadYear);
        return result.toResponseObject();
        // } else {
        throw new HttpException(
            `Username is already taken`,
            HttpStatus.CONFLICT,
        );
        // }
    }

    async update(updateDTO: OlympiadYearDTO): Promise<OlympiadYearRO> {
        const toBeUpdated = await this.yearsRepository.findOne({where: {id: updateDTO.id}});

        //TODO NO ROUNDS RESET
        //RESET array
        // updateDTO.rounds = [];
        //
        // for (const roundId of updateDTO.roundIds) {
        //     updateDTO.rounds.push(await this.roundsRepository.findOne({where: {id: roundId}}));
        // }

        if (toBeUpdated != undefined) {
            const merged = this.yearsRepository.merge(toBeUpdated, updateDTO);
            await this.yearsRepository.update(merged.id, merged);
            const result = await this.yearsRepository.findOne({where: {id: merged.id}});

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Olympiad year with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }

        //TODO
    }
}
