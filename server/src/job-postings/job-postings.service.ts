import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateJobPostingDto } from './dto/create-job-posting.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { JobPosting } from '@app/job-postings/entities/job-posting.entity'
import { Repository } from 'typeorm'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'
import { User } from '@app/users/entities/user.entity'
import { VacanciesService } from '@app/vacancies/vacancies.service'
import { UsersService } from '@app/users/users.service'

@Injectable()
export class JobPostingsService {
	constructor(
		@InjectRepository(JobPosting)
		private readonly jobRepository: Repository<JobPosting>,
		private readonly vacancyService: VacanciesService,
		private readonly userService: UsersService
	) {}

	async create(dto: CreateJobPostingDto) {
		const user = await this.userService.findById(dto.userId)
		const vacancy = await this.vacancyService.findOneVacancy(dto.vacancyId)

		if (!user || !vacancy) {
			throw new BadRequestException('Links error')
		}

		return this.jobRepository.save({
			user,
			vacancy,
		})
	}

	findAll() {
		return this.jobRepository.find({
			order: {
				id: 'DESC',
			},
			relations: {
				vacancy: true,
				user: true,
			},
			loadEagerRelations: true,
		})
	}
}
