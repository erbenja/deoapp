import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {GuaranteeEntity} from "./guarantee.entity";
import {GuaranteeDTO, GuaranteeREntities, GuaranteeRO} from "./guarantee.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AccountEntity} from "../account/account.entity";
import {RegionEntity} from "../region/region.entity";
import {DistrictEntity} from "../district/district.entity";
import {SchoolEntity} from "../school/school.entity";
import {RoundTypeEntity} from "../round-type/round-type.entity";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";
import {allRelations} from "./guarantee.constants";

@Injectable()
export class GuaranteeService extends BaseService<GuaranteeEntity, GuaranteeRO, GuaranteeDTO> {
    constructor(@InjectRepository(GuaranteeEntity) private guaranteesRepository: Repository<GuaranteeEntity>,
                @InjectRepository(AccountEntity) private accountsRepository: Repository<AccountEntity>,
                @InjectRepository(RegionEntity) private regionsRepository: Repository<RegionEntity>,
                @InjectRepository(DistrictEntity) private districtsRepository: Repository<DistrictEntity>,
                @InjectRepository(SchoolEntity) private schoolsRepository: Repository<SchoolEntity>,
                @InjectRepository(RoundTypeEntity) private typesRepository: Repository<RoundTypeEntity>,
                @InjectRepository(OlympiadRoundEntity) private roundsRepository: Repository<OlympiadRoundEntity>) {
        super(guaranteesRepository);
    }

    async create(createDTO: GuaranteeDTO): Promise<GuaranteeRO> {
        const {accountId} = createDTO;
        const newGuarantee = this.guaranteesRepository.create();

        const accountAlreadyHasGuarantee = await this.guaranteesRepository.findOne({where: {account: accountId}});

        // console.log(accountAlreadyHasGuarantee);

        if(accountAlreadyHasGuarantee == undefined) {
            const foundAccount = await this.accountsRepository.findOne({where: {id: accountId}});
            if (foundAccount != undefined) {
                newGuarantee.account = foundAccount;
            } else {
                throw new HttpException(
                    `Account with id ${accountId} doesnt exist`,
                    HttpStatus.NOT_ACCEPTABLE,
                );
            }
        } else {
            throw new HttpException(
                `Account with id ${accountId} already is guarantee`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }

        const foundEntities = await this.getRelatedEntities(createDTO);

        for(const [name, value] of Object.entries(foundEntities)){
            newGuarantee[name] = value;
        }

        await this.guaranteesRepository.save(newGuarantee);

        const result = await this.guaranteesRepository.findOne({where: {id: newGuarantee.id}, relations: allRelations});

        return result.toResponseObject();
    }

    async update(updateDTO: GuaranteeDTO): Promise<GuaranteeRO> {
        const toBeUpdated = await this.guaranteesRepository.findOne({where: {id: updateDTO.id}});

        const updateWithEntities =  await this.getRelatedEntities(updateDTO);

        if (toBeUpdated != undefined) {
            const merged = await this.guaranteesRepository.merge(toBeUpdated, updateWithEntities);
            console.log(toBeUpdated);
            await this.guaranteesRepository.save(merged);

            const result = await this.guaranteesRepository.findOne({where: {id: merged.id}});
            return result.toResponseObject();

        } else {
            throw new HttpException(
                `Invalid id`,
                HttpStatus.NOT_ACCEPTABLE,
            );
        }
    }

    async getRelatedEntities(guaranteeDTO: GuaranteeDTO): Promise<GuaranteeREntities>{
        const {regionIds, districtIds, schoolIds, roundTypeIds, guaranteedRoundIds} = guaranteeDTO;
        const resultEntities = new GuaranteeREntities();

        //REGIONS
        if (regionIds != undefined) {
            const foundRegions = await this.regionsRepository.findByIds(regionIds);
            if (foundRegions.length != 0) {
                resultEntities.regions = foundRegions;
            }
        }

        //DISTRICTS
        if (districtIds != undefined) {
            const foundDistricts = await this.districtsRepository.findByIds(districtIds);
            if (foundDistricts.length != 0) {
                resultEntities.districts = foundDistricts;
            }
        }

        //SCHOOLS
        if (schoolIds != undefined) {
            const foundSchools = await this.schoolsRepository.findByIds(schoolIds);
            if (foundSchools.length != 0) {
                resultEntities.schools = foundSchools;
            }
        }

        //ROUND TYPE
        if (roundTypeIds != undefined) {
            const foundRoundTypes = await this.typesRepository.findByIds(roundTypeIds);
            if (foundRoundTypes.length != 0) {
                resultEntities.roundTypes = foundRoundTypes;
            }
        }

        //ROUNDS
        if (guaranteedRoundIds != undefined) {
            const foundRounds = await this.roundsRepository.findByIds(guaranteedRoundIds);
            if (foundRounds.length != 0) {
                resultEntities.guaranteedRounds = foundRounds;
            }
        }

        return resultEntities;
    }


}
