import {BaseEntity} from "./base-entity";
import {Repository} from "typeorm";
import {HttpException, HttpStatus} from "@nestjs/common";
import {OlympiadYearDTO, OlympiadYearRO} from "../olympiad-year/olympiad-year.dto";


export abstract class BaseService<E extends BaseEntity<RO>, RO, DTO> {
    private repository: Repository<E>;

    protected constructor(repository: Repository<E>) {
        this.repository = repository;
    }

    async getById(id: number, relations: string[] = [], order: {} = {}, args: {} = {}): Promise<RO> {
        const item = await this.repository.findOne({where: {id: id}, relations, order});

        console.log(item);

        try {
            return item.toResponseObject(args);
        } catch (e) {
            throw new HttpException(`Item with id ${id} doesnt exists; ${e.toString()}`, HttpStatus.NO_CONTENT)
        }
    }

    async getAll(relations: string[] = [], order: {} = {}, args: {} = {}): Promise<RO[]> {
        const items = await this.repository.find({relations, order});
        return items.map(item => item.toResponseObject(args));
    }

    async delete(id: number) {
        try {
            return await this.repository.delete(id);
        } catch (e) {
            throw new HttpException(`Item with id ${id} doesnt exists; ${e.toString()}`, HttpStatus.NO_CONTENT)
        }
    }


    protected transformPropertyToRO(id: number, foundEntity, propertyName: string, entityDescription?: string) {
        // console.log(foundEntity);
        if (foundEntity != undefined) {
            if (foundEntity[propertyName] != undefined) {
                if (Array.isArray(foundEntity[propertyName])) {
                    const resultList = foundEntity[propertyName].map(item => item.toResponseObject())
                    // console.log(resultList);
                    return resultList;
                } else {
                    const resultItem = foundEntity[propertyName].toResponseObject();
                    return resultItem;
                }
            } else {
                throw new HttpException(
                    `${propertyName} of ${foundEntity.name} with id ${id} isnt defined`,
                    HttpStatus.NO_CONTENT,
                );
            }
        } else {
            throw new HttpException(
                `Entity with id ${id} doesnt exist`,
                HttpStatus.NO_CONTENT,
            );
        }
    }

    abstract async create(createDTO: DTO): Promise<RO>;

    abstract async update(updateDTO: DTO): Promise<RO>;

    // {
    // const toBeUpdated = await this.repository.findOne({where: {id: updateDTO['id']}});
    //
    // //RESET array
    // // updateDTO.rounds = [];    // updateDTO.rounds = [];
    //
    // // for (const roundId of updateDTO.roundIds) {
    // //     updateDTO.rounds.push(await this.repository.findOne({where: {id: roundId}}));
    // // }
    //
    // if (toBeUpdated != undefined) {
    //     const merged = this.repository.merge(toBeUpdated, updateDTO);
    //     await this.repository.update(merged.id, merged);
    //     const result = await this.repository.findOne({where: {id: merged.id}});
    //
    //     return result.toResponseObject();
    // } else {
    //     throw new HttpException(
    //         `Olympiad year with id ${updateDTO.id} doesnt exist`,
    //         HttpStatus.NOT_FOUND,
    //     );
    // }
    // }

    // {
    //     const toBeUpdated = await this.repository.findOne(updateDTO["id"]);
    //
    //     if(toBeUpdated != undefined) {
    //         const merged = await this.repository.merge(toBeUpdated, updateDTO);
    //         await this.repository.save(merged);
    //         const result = await this.repository.findOne(merged.id);
    //
    //         return result.toResponseObject();
    //     } else {
    //         throw new HttpException(
    //             `Account with id ${updateDTO["id"]} doesnt exist`,
    //             HttpStatus.NOT_FOUND,
    //         );
    //     }
    //
    // };

}
