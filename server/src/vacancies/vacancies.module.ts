import { Module } from '@nestjs/common'
import { VacanciesService } from './vacancies.service'
import { VacanciesController } from './vacancies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { VacancyCategory } from '@app/vacancies/entities/category.entity'
import { Vacancy } from '@app/vacancies/entities/vacancy.entity'
import { User } from '@app/users/entities/user.entity'

@Module({
	controllers: [VacanciesController],
	providers: [VacanciesService],
	imports: [TypeOrmModule.forFeature([VacancyCategory, Vacancy, User])],
})
export class VacanciesModule {}
