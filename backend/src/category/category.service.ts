import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {BaseService} from "../shared/base-service";
import {CategoryEntity} from "./category.entity";
import {CategoryDTO, CategoryRO} from "./category.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {TestEntity} from "../test/test.entity";
import {Repository} from "typeorm";
import {OlympiadRoundEntity} from "../olympiad-round/olympiad-round.entity";

@Injectable()
export class CategoryService extends BaseService<CategoryEntity, CategoryRO, CategoryDTO> {
    constructor(@InjectRepository(CategoryEntity) private categoriesRepository: Repository<CategoryEntity>) {
        super(categoriesRepository);
    }

    async create(createDTO: CategoryDTO): Promise<CategoryRO> {
        const {name, classMin, classMax} = createDTO;
        const newCategory = await this.categoriesRepository.create();
        newCategory.name = name;
        newCategory.classMin = classMin;
        newCategory.classMax = classMax;

        console.log(newCategory);

        await this.categoriesRepository.save(newCategory);

        const result = await this.categoriesRepository.findOne(newCategory);

        return result.toResponseObject();
    }

    async update(updateDTO: CategoryDTO): Promise<CategoryRO> {
        const toBeUpdated = await this.categoriesRepository.findOne(updateDTO.id);

        if (toBeUpdated != undefined) {
            const merged = this.categoriesRepository.merge(toBeUpdated, updateDTO);
            await this.categoriesRepository.update(merged.id, merged);
            const result = await this.categoriesRepository.findOne(merged.id);

            return result.toResponseObject();
        } else {
            throw new HttpException(
                `Category with id ${updateDTO.id} doesnt exist`,
                HttpStatus.NOT_FOUND,
            );
        }
    }
}
