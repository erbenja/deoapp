import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {ContestantEntity} from "./contestant.entity";
import {ContestantDTO, ContestantRO} from "./contestant.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {SchoolEntity} from "../school/school.entity";
import {createQueryBuilder, getManager, Repository} from "typeorm";
import {DistrictEntity} from "../district/district.entity";
import {ContactPersonEntity} from "../contact-person/contact-person.entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {OlympiadYearEntity} from "../olympiad-year/olympiad-year.entity";
import {AccessCodeEntity} from "../access-code/access-code.entity";

@Injectable()
export class ContestantService extends BaseService<ContestantEntity, ContestantRO, ContestantDTO> {
    constructor(@InjectRepository(ContestantEntity) private contestantsRepository: Repository<ContestantEntity>,
                @InjectRepository(SchoolEntity) private schoolsRepository: Repository<SchoolEntity>,
                @InjectRepository(OlympiadRoundEntity) private roundsRepository: Repository<OlympiadRoundEntity>,
                // @InjectRepository(OlympiadYearEntity) private yearsRepository: Repository<OlympiadYearEntity>,
                @InjectRepository(AccessCodeEntity) private codeRepository: Repository<AccessCodeEntity>) {
        super(contestantsRepository);
    }

    async create(createDTO: ContestantDTO): Promise<ContestantRO> {
        const {firstname, surname, email, classNum, birthdate, schoolId, yearId} = createDTO;
        const newContestant = this.contestantsRepository.create();
        newContestant.firstname = firstname;
        newContestant.surname = surname;
        newContestant.email = email;
        newContestant.classNum = classNum;
        newContestant.birthdate = birthdate;
        console.log(newContestant);

        const foundSchool = await this.schoolsRepository.findOne({where: {id: schoolId}});
        if(foundSchool != undefined) {
            newContestant.school = foundSchool;
        } else {
            throw new HttpException(
                `School with id ${schoolId} doesnt exist`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        const foundRound = await this.roundsRepository.findOne({where: {year: yearId, previousRound: null}});
        if(foundRound != undefined) {
            const newAccessCode = this.codeRepository.create();
            newAccessCode.round = foundRound;
            newAccessCode.contestant = newContestant;

            newContestant.accessCodes = [newAccessCode];

            let id;
            await getManager().transaction(async manager => {
                id = (await manager.save(newContestant))['id'];
                console.log('--AFTER CONTESTANT--');
                await manager.save(newAccessCode);
                console.log('--AFTER CODE--');
            });

            // await this.contestantsRepository.save(newContestant);
            const result = await this.contestantsRepository.findOne({where: {id: id}});

            // console.log(result);

            return result;
        } else {
            throw new HttpException(
                `Olympiad round person with year.id ${yearId} doesnt exist`,
                HttpStatus.NO_CONTENT,
            );
        }
    }

    async update(updateDTO: ContestantDTO): Promise<ContestantRO> {
        const toBeUpdated = await this.contestantsRepository.findOne(updateDTO.id);

        // updateDTO.lastModified = new Date();

        if (toBeUpdated != undefined) {
            const merged = this.contestantsRepository.merge(toBeUpdated, updateDTO);
            await this.contestantsRepository.update(merged.id, merged);
            const result = await this.contestantsRepository.findOne(merged.id);

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Contestant with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async getAllByOlympiadRoundId(id: number): Promise<any>{
        const foundContestants = await this.contestantsRepository
            .createQueryBuilder("contestant")
            .innerJoin("contestant.accessCodes", "accessCodes")
            .innerJoin("accessCodes.round", "round")
            .where("round.id = :id", {id: id})
            .distinct(true)
            .getMany();

        if(foundContestants.length != 0){
            return foundContestants.map(contestant => contestant.toResponseObject());
        } else {
            return foundContestants;
        }
    }

    async getAllBYOlympiadYear(id: number): Promise<ContestantRO[]> {
        const foundContestants = await this.contestantsRepository
            .createQueryBuilder("contestant")
            .innerJoin("contestant.accessCodes", "accessCodes")
            .innerJoin("accessCodes.round", "round")
            .innerJoin("round.year", "year")
            .where("year.id = :id", {id: id})
            .distinct(true)
            .getMany();

        if(foundContestants.length != 0){
            return foundContestants.map(contestant => contestant.toResponseObject());
        } else {
            return foundContestants;
        }
    }

    async getAllByGuaranteeId(id: number): Promise<ContestantRO[]>{
        // const relations = ['accessCodes', 'accessCodes.round', 'accessCodes.round.guarantees', 'accessCodes.round.type', 'accessCodes.round.type.guarantees'];
        // const foundContestants = await this.contestantsRepository.find({where: {accessCodes.round.guarantees.id === id}, relations});

        const foundContestants = await this.contestantsRepository
            .createQueryBuilder("contestant")
            .leftJoinAndSelect( "contestant.school", "school")
            .leftJoin("school.guarantees", "schoolG")
            .leftJoinAndSelect( "school.district", "district")
            .leftJoin("district.guarantees", "districtG")
            .leftJoinAndSelect( "district.region", "region")
            .leftJoin("region.guarantees", "regionG")
            // .innerJoinAndMapMany("contestant.accessCodes", "contestant.accessCodes", "accessCode")
            .leftJoinAndSelect( "contestant.accessCodes", "accessCode")
            .leftJoinAndSelect("accessCode.round", "round")
            // .innerJoin("round.year", "year")
            .leftJoinAndSelect("round.type", "type")
            .leftJoin( "round.guarantees", "roundG")
            .leftJoin("type.guarantees", "typeG")
            .where("schoolG.id = :id", {id})
            .orWhere("districtG.id = :id", {id})
            .orWhere("regionG.id = :id", {id})
            .orWhere("roundG.id = :id", {id})
            .orWhere("typeG.id = :id", {id})
            // .orWhere("rg.id = :id", {id})
            .distinct(true)
            // .getRawAndEntities();
            // .groupBy("school.name")
            // .addGroupBy("contestant.id")
            // .addGroupBy("school.id")
            // .addGroupBy("accessCode.id")
            // .addGroupBy("round.id")
            .getMany();

        //TODO

        console.log(foundContestants);

        return foundContestants;

        if(foundContestants.length != 0){
            return foundContestants.map(contestant => contestant.toResponseObject());
        } else {
            return [];
        }
    }

}
