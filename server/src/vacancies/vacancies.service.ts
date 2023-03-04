import { Injectable } from '@nestjs/common'
import { CreateVacancyDto } from './dto/create-vacancy.dto'
import { UpdateVacancyDto } from './dto/update-vacancy.dto'
import { VacancyCategory } from '@app/vacancies/entities/category.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class VacanciesService {
	constructor(
		@InjectRepository(VacancyCategory)
		private readonly categoryRepository: Repository<VacancyCategory>
	) {}

	async create(dto: CreateVacancyDto) {
		return await this.categoryRepository.save(dto)
	}

	findAll() {
		return `This action returns all vacancies`
	}

	findOne(id: number) {
		return `This action returns a #${id} vacancy`
	}

	update(id: number, updateVacancyDto: UpdateVacancyDto) {
		return `This action updates a #${id} vacancy`
	}

	remove(id: number) {
		return `This action removes a #${id} vacancy`
	}
}
