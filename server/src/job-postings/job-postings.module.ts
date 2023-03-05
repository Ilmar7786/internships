import { Module } from '@nestjs/common'
import { JobPostingsService } from './job-postings.service'
import { JobPostingsController } from './job-postings.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { JobPosting } from '@app/job-postings/entities/job-posting.entity'
import { UsersModule } from '@app/users'
import { VacanciesModule } from '@app/vacancies/vacancies.module'

@Module({
	controllers: [JobPostingsController],
	providers: [JobPostingsService],
	imports: [
		TypeOrmModule.forFeature([JobPosting]),
		UsersModule,
		VacanciesModule,
	],
})
export class JobPostingsModule {}
