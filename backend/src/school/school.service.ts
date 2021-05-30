import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {SchoolEntity} from "./school.entity";
import {SchoolDTO, SchoolRO} from "./school.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {OlympiadYearEntity} from "../olympiad-year/olympiad-year.entity";
import {Repository} from "typeorm";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {DistrictEntity} from "../district/district.entity";
import {ContactPersonEntity} from "../contact-person/contact-person.entity";

@Injectable()
export class SchoolService extends BaseService<SchoolEntity, SchoolRO, SchoolDTO>{
    constructor(@InjectRepository(SchoolEntity) private schoolsRepository: Repository<SchoolEntity>,
                @InjectRepository(DistrictEntity) private districtsRepository: Repository<DistrictEntity>,
                @InjectRepository(ContactPersonEntity) private contactPersonsRepository: Repository<ContactPersonEntity>) {
        super(schoolsRepository);
    }


    async create(createDTO: SchoolDTO): Promise<SchoolRO> {
        const {name, districtId, contactPersonId} = createDTO;
        const newSchool = this.schoolsRepository.create();
        newSchool.name = name;

        const foundDistrict = await this.districtsRepository.findOne({where: {id: districtId}});
        if(foundDistrict != undefined) {
            newSchool.district = foundDistrict;
        } else {
            throw new HttpException(
                `District with id ${districtId} doesnt exist`,
                HttpStatus.NO_CONTENT,
            );
        }

        const foundPerson = await this.districtsRepository.findOne({where: {id: districtId}});
        if(foundPerson != undefined) {
            newSchool.district = foundPerson;
        } else {
            throw new HttpException(
                `Contact person with id ${districtId} doesnt exist`,
                HttpStatus.NO_CONTENT,
            );
        }

        await this.schoolsRepository.save(newSchool);
        const result = await this.schoolsRepository.findOne({where: {id: newSchool.id}});

        return result;
    }

    async update(updateDTO: SchoolDTO): Promise<SchoolRO> {
        const toBeUpdated = await this.schoolsRepository.findOne({where: {id: updateDTO.id}});

        if (toBeUpdated != undefined) {
            const merged = this.schoolsRepository.merge(toBeUpdated, updateDTO);
            await this.schoolsRepository.update(merged.id, merged);
            const result = await this.schoolsRepository.findOne({where: {id: merged.id}});

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `School with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }

        //TODO
    }
}
