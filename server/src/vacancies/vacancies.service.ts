import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateVacancyDto } from './dto/create-vacancy.dto'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import { VacancyCategory } from '@app/vacancies/entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'
import { CreateCategoryDto } from '@app/vacancies/dto/create-category.dto'
import { UpdateCategoryDto } from '@app/vacancies/dto/update-category.dto'
import { UsersService } from '@app/users/users.service'

@Injectable()
export class VacanciesService {
	constructor(
		@InjectRepository(VacancyCategory)
		private readonly categoryRepository: Repository<VacancyCategory>,
		@InjectRepository(Vacancy)
		private readonly vacancyRepository: Repository<Vacancy>,
		private readonly userService: UsersService
	) {}

	async createCategory(dto: CreateCategoryDto): Promise<VacancyCategory> {
		return await this.categoryRepository.save(dto)
	}

	async updateCategory(
		id: number,
		dto: UpdateCategoryDto
	): Promise<VacancyCategory | null> {
		await this.categoryRepository.update(id, dto)
		return await this.categoryRepository.findOne({ where: { id } })
	}

	async removeCategory(id: number): Promise<void> {
		await this.categoryRepository.delete(id)
	}

	async findAllCategory(): Promise<VacancyCategory[]> {
		return this.categoryRepository.find()
	}

	async createVacancy(dto: CreateVacancyDto): Promise<Vacancy> {
		const category = await this.categoryRepository.findOne({
			where: { id: dto.categoryId },
		})
		if (!category) throw new BadRequestException('Category not fount')

		return await this.vacancyRepository.save({ ...dto, category })
	}

	async recommendationsFindAllVacancy(userId: number): Promise<Vacancy[]> {
		const user = await this.userService.getUserInfo(userId)
		const userSpecialty = user.specialty

		return await this.vacancyRepository
			.createQueryBuilder('user')
			.where(
				'user.speciality_field_education_id = :field OR user.speciality_enlarged_group_id = :group OR ' +
					'user.speciality_level_education_id = :lvl OR user.speciality_profession_id = :profession',
				{
					field: userSpecialty.specialityFieldEducation.id,
					group: userSpecialty.specialityEnlargedGroup.id,
					lvl: userSpecialty.specialityLevelEducation.id,
					profession: userSpecialty.specialityProfession.id,
				}
			)
			.leftJoinAndSelect('user.category', 'category')
			.getMany()

		// return this.vacancyRepository.find({
		// 	order: {},
		// 	relations: {
		// 		category: true,
		// 	},
		// })
	}

	async findAllVacancy(): Promise<Vacancy[]> {
		return this.vacancyRepository.find({
			relations: {
				category: true,
			},
		})
	}

	findOneVacancy(id: number): Promise<Vacancy | null> {
		return this.vacancyRepository.findOne({
			where: { id },
			relations: {
				category: true,
			},
		})
	}

	async updateVacancy(id: number, dto: UpdateVacancyDto): Promise<Vacancy> {
		await this.vacancyRepository.update(id, dto)
		return await this.findOneVacancy(id)
	}

	async removeVacancy(id: number): Promise<void> {
		await this.vacancyRepository.delete(id)
	}
}
