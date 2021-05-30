import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {ContactPersonDTO, ContactPersonRO} from "./contact-person.dto";
import {ContactPersonEntity} from "./contact-person.entity";
import {InjectRepository} from "@nestjs/typeorm";
import {DistrictEntity} from "../district/district.entity";
import {Repository} from "typeorm";
import {RegionEntity} from "../region/region.entity";
import {SchoolEntity} from "../school/school.entity";

@Injectable()
export class ContactPersonService extends BaseService<ContactPersonEntity, ContactPersonRO, ContactPersonDTO>{
    constructor(@InjectRepository(ContactPersonEntity) private contactPersonsRepository: Repository<ContactPersonEntity>,
                @InjectRepository(RegionEntity) private regionsRepository: Repository<RegionEntity>,
                @InjectRepository(DistrictEntity) private districtsRepository: Repository<DistrictEntity>,
                @InjectRepository(SchoolEntity) private schoolsRepository: Repository<SchoolEntity>) {
        super(contactPersonsRepository);
    }


    async create(createDTO: ContactPersonDTO): Promise<ContactPersonRO> {
        const {firstname, surname, email, phone, regionIds, districtIds, schoolIds} = createDTO;
        const newContactPerson = await this.contactPersonsRepository.create();
        newContactPerson.firstname = firstname;
        newContactPerson.surname = surname;
        newContactPerson.email = email;
        newContactPerson.phone = phone;


        if (regionIds != undefined) {
            const foundRegions = await this.regionsRepository.findByIds(regionIds);

            if (foundRegions != undefined) {
                newContactPerson.regions = foundRegions;
            } else {
                // throw new HttpException(
                //     `Round Type id is invalid`,
                //     HttpStatus.NOT_FOUND,
                // );
            }
        }

        if (districtIds != undefined) {
            const foundDistricts = await this.districtsRepository.findByIds(districtIds);
            if (foundDistricts != undefined) {
                newContactPerson.districts = foundDistricts;
            } else {
                // throw new HttpException(
                //     `Round Type id is invalid`,
                //     HttpStatus.NOT_FOUND,
                // );
            }
        }

        if (schoolIds != undefined) {
            const foundSchools = await this.schoolsRepository.findByIds(schoolIds);
            if (foundSchools != undefined) {
                newContactPerson.schools = foundSchools;
            } else {
                // throw new HttpException(
                //     `Round Type id is invalid`,
                //     HttpStatus.NOT_FOUND,
                // );
            }
        }

        await this.contactPersonsRepository.save(newContactPerson);

        const result = await this.contactPersonsRepository.findOne(newContactPerson);

        return result.toResponseObject();
        // } else {
        // throw new HttpException(
        //     `Username is already taken`,
        //     HttpStatus.CONFLICT,
        // );
        // }
    }

    async update(updateDTO: ContactPersonDTO): Promise<ContactPersonRO> {
        const toBeUpdated = await this.contactPersonsRepository.findOne(updateDTO.id);

        if (toBeUpdated != undefined) {
            const merged = this.contactPersonsRepository.merge(toBeUpdated, updateDTO);
            await this.contactPersonsRepository.update(merged.id, merged);
            const result = await this.contactPersonsRepository.findOne(merged.id);

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Contact person round with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
    }

    async getByRegionId(id: number): Promise<ContactPersonRO>  {
        const foundRegion = await this.regionsRepository.findOne({where: {id: id}, relations: ['contactPerson']});
        // return this.processListToRO(id, foundDistrict, "contactPerson", "Region");
        // return this.processContactPerson(id, foundDistrict, "Region")
        return this.transformPropertyToRO(id, foundRegion, "contactPerson");
    }

    async getByDistrictId(id: number): Promise<ContactPersonRO> {
        const foundDistrict = await this.districtsRepository.findOne({where: {id: id}, relations: ['contactPerson']});
        // return this.processContactPerson(id, foundDistrict, "District")
        return this.transformPropertyToRO(id, foundDistrict, "contactPerson");
    }

    async getBySchoolId(id: number): Promise<ContactPersonRO> {
        const foundSchool = await this.schoolsRepository.findOne({where: {id: id}, relations: ['contactPerson']});
        // return this.processContactPerson(id, foundDistrict, "School")
        return this.transformPropertyToRO(id, foundSchool, "contactPerson");
    }

    // private processContactPerson(id: number, foundEntity, entityDescription: string ): ContactPersonRO{
    //     if (foundEntity != undefined){
    //         if(foundEntity.contactPerson != undefined) {
    //             const contactPerson = foundEntity.contactPerson.toResponseObject();
    //             return contactPerson;
    //         } else {
    //             throw new HttpException(
    //                 `Contact person of ${entityDescription} with id ${id} isnt defined`,
    //                 HttpStatus.NO_CONTENT,
    //             );
    //         }
    //     } else {
    //         throw new HttpException(
    //             `${entityDescription} with id ${id} doesnt exist`,
    //             HttpStatus.NO_CONTENT,
    //         );
    //     }
    // }
}
