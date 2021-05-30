import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {OlympiadRoundEntity} from "./olympiad-round.entity";
import {OlympiadRoundDTO, OlympiadRoundRO} from "./olympiad-round.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {OlympiadYearEntity} from "../olympiad-year/olympiad-year.entity";
import {getManager, Repository} from "typeorm";
import {OlympiadYearDTO, OlympiadYearRO} from "../olympiad-year/olympiad-year.dto";
import {RoundTypeRO} from "../round-type/round-type.dto";
import {RoundTypeEntity} from "../round-type/round-type.entity";
import {TestEntity} from "../test/test.entity";
import {CategoryService} from "../category/category.service";
import {CategoryEntity} from "../category/category.entity";
import {async} from "rxjs/internal/scheduler/async";

@Injectable()
export class OlympiadRoundService extends BaseService<OlympiadRoundEntity, OlympiadRoundRO, OlympiadRoundDTO> {

    constructor(@InjectRepository(OlympiadRoundEntity) private roundsRepository: Repository<OlympiadRoundEntity>,
                @InjectRepository(OlympiadYearEntity) private yearsRepository: Repository<OlympiadYearEntity>,
                @InjectRepository(RoundTypeEntity) private typesRepository: Repository<RoundTypeEntity>,
                @InjectRepository(TestEntity) private testsRepository: Repository<TestEntity>,
                @InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>
    ) {
        super(roundsRepository);
    }

    async getAllByYearId(id: number): Promise<OlympiadRoundRO[]> {
        const propertyName = 'rounds';
        const foundYear = await this.yearsRepository.findOne({
            where: {id: id},
            relations: [propertyName]
        });

        return this.transformPropertyToRO(id, foundYear, propertyName, 'Olympiad year');
    }


    //create is called only from /api/olympiadyear/:id/olympiadrounds
    async create(createDTO: OlympiadRoundDTO): Promise<OlympiadRoundRO> {
        const {roundStart, roundEnd, typeId, yearId, nextRoundId, previousRoundId} = createDTO;
        const newOlympiadRound = await this.roundsRepository.create();
        newOlympiadRound.roundStart = roundStart;
        newOlympiadRound.roundEnd = roundEnd;

        // console.log(`typeId ${typeId} | nextRoundId ${nextRoundId} | yearId ${yearId} `);
        const foundType = await this.typesRepository.findOne({where: {id: typeId}});
        const foundNextRound = await this.roundsRepository.findOne({where: {id: nextRoundId}});
        const foundPreviousRound = await this.roundsRepository.findOne({where: {id: previousRoundId}});
        const foundYear = await this.yearsRepository.findOne({where: {id: yearId}})

        if (foundType != undefined) {
            newOlympiadRound.type = foundType;
        } else {
            throw new HttpException(
                `Round Type id ${typeId} is invalid`,
                HttpStatus.NOT_FOUND,
            );
        }

        if (nextRoundId !== undefined) {
            if (foundNextRound != undefined) {
                // console.log(foundNextRound);
                newOlympiadRound.nextRound = foundNextRound;
            } else {
                throw new HttpException(
                    `Olympiad Round ID for next round is invalid`,
                    HttpStatus.NOT_FOUND,
                );
            }
        }

        if (foundYear != undefined) {
            newOlympiadRound.year = foundYear;
        } else {
            throw new HttpException(
                `Olympiad Year ${yearId} is invalid`,
                HttpStatus.NOT_FOUND,
            );
        }

        //TODO - add creation of all new tests for all categories or chosen ones
        const allCategories = await this.categoriesRepository.find();
        const tests = [];
        if (allCategories != undefined) {
            allCategories.forEach(category => {
                const newTest = this.testsRepository.create();
                newTest.category = category;
                newTest.closed = false;
                newTest.created = new Date();
                newTest.lastModified = new Date();
                newTest.timeLimit = 90;
                newTest.round = newOlympiadRound;

                tests.push(newTest);
            });
        }

        // await getManager().transaction(async transactionManager =>{
        //     await transactionManager.save(newOlympiadRound);
        //     for(let i = 0; i < tests.length; i++) {
        //         await transactionManager.save(tests[i]);
        //     }
        //     // if(tests != undefined){
        //     //     tests.forEach(async test => await transactionManager.save(test));
        //     // }
        // })

        newOlympiadRound.tests = tests;

        await this.roundsRepository.save(newOlympiadRound);

        const result = await this.roundsRepository.findOne({where: {id: newOlympiadRound.id}});


        if (previousRoundId !== undefined) {
            if (foundPreviousRound != undefined) {
                // console.log(foundNextRound);
                foundPreviousRound.nextRound = result;
                await this.roundsRepository.update(foundPreviousRound.id, foundPreviousRound);
            } else {
                throw new HttpException(
                    `Olympiad Round ID for previous round is invalid`,
                    HttpStatus.NOT_FOUND,
                );
            }
        }

        // console.log(result);

        return result.toResponseObject();
        // } else {
        // throw new HttpException(
        //     `Username is already taken`,
        //     HttpStatus.CONFLICT,
        // );
        // }
    }

    async update(updateDTO: OlympiadRoundDTO): Promise<OlympiadRoundRO> {
        const toBeUpdated = await this.roundsRepository.findOne(updateDTO.id);

        if (toBeUpdated != undefined) {
            const foundRoundType = await this.typesRepository.findOne({where: {id: updateDTO.typeId}});
            toBeUpdated.type = foundRoundType;
            const merged = this.roundsRepository.merge(toBeUpdated, updateDTO);

            await this.roundsRepository.update(merged.id, merged);
            const result = await this.roundsRepository.findOne(merged.id);

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Olympiad round with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
        //TODO
    }

    async delete(id: number) {
        try {
            const relations = ['previousRound', 'nextRound']
            const entity = await this.roundsRepository.findOne({
                where: {id: id},
                relations,
            });

            console.clear();
            console.log(`-----------------`);
            console.log(entity);

            let previousRound = undefined;
            if (entity.previousRound !== null) {
                previousRound = await this.roundsRepository.findOne({
                    where: {id: entity.previousRound.id},
                    relations,
                });
            }


            let nextRound = undefined;
            if (entity.nextRound !== null) {
                nextRound = await this.roundsRepository.findOne({
                    where: {id: entity.nextRound.id},
                    relations,
                });
            }

            entity.nextRound = undefined;
            delete entity.previousRound;
            await this.roundsRepository.update(entity.id, entity);

            if (previousRound !== undefined) {
                previousRound.nextRound = nextRound;
                delete previousRound.previousRound;
                await this.roundsRepository.update(previousRound.id, previousRound);
            }

            return await this.roundsRepository.delete(entity.id);
        } catch (e) {
            throw new HttpException(`RELATIONS NOT HANDLED CORRECTLY; ${e.toString()}`, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
