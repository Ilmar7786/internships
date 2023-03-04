import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateVacancyDto } from './dto/create-vacancy.dto'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import { VacancyCategory } from '@app/vacancies/entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'
import { CreateCategoryDto } from '@app/vacancies/dto/create-category.dto'
import { UpdateCategoryDto } from '@app/vacancies/dto/update-category.dto'

@Injectable()
export class VacanciesService {
	constructor(
		@InjectRepository(VacancyCategory)
		private readonly categoryRepository: Repository<VacancyCategory>,
		@InjectRepository(Vacancy)
		private readonly vacancyRepository: Repository<Vacancy>
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
		return await this.vacancyRepository.save(dto)
	}

	// todo сделать логику рекомендации
	recommendationsFindAllVacancy(): Promise<Vacancy[]> {
		return this.vacancyRepository.find()
	}

	findAllVacancy(): Promise<Vacancy[]> {
		return this.vacancyRepository.find({ loadRelationIds: true })
	}

	findOneVacancy(id: number): Promise<Vacancy | null> {
		return this.vacancyRepository.findOne({
			where: { id },
			loadRelationIds: true,
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
